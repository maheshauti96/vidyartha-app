import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import {
    createDelivery,
    getBooks,
    getBooksByCode,
    getBooksByName,
} from "../../services/service";
import { TextField } from "@material-ui/core";
import { debounce } from "lodash";
import { CloseOutlined, DeleteOutlineRounded } from "@material-ui/icons";

const CreateDeliveryForm = ({ schoolData, setDeliverySchool }) => {
    const [books, setBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [amount, setAmount] = useState();
    const [desc , setDesc] = useState('')
    const [response , setResponse] = useState()

    const searchByCode = debounce((value) => {
        if (value) {
            getBooksByCode(setBooks, value);
        } else {
            getBooks(setBooks, 10);
        }
    }, 1000);

    const searchByName = debounce((value) => {
        if (value) {
            getBooksByName(setBooks, value);
        } else {
            getBooks(setBooks, 10);
        }
    }, 1000);

    const deleteSelectedBook = (code) => {
        let newArr = selectedBooks.filter((book) => book.code !== code)
        setSelectedBooks(newArr)
    }

    const addBooksForDelivery = (e, value) => {
        {
            if (value) {
                const newArr = selectedBooks;
                newArr.push({ code: value.code, description: value.description, quantity: 1 });
                setSelectedBooks(newArr);
            }
        }
    };

    function bookQuantityChanger(codeGiven, quantityGiven) {
        const newArr = selectedBooks
        newArr = newArr.map((book) => {
            if (book.code === codeGiven) {
                book.quantity = quantityGiven
            }
            return book
        })
        setSelectedBooks(newArr)
    }
    useEffect(() => {
        getBooks(setBooks, 10);
    }, []);
    return (
        <div className="delivery-form-container">
            {schoolData && <div className="delivery-form">
                <div className="button-display">

                    <button onClick={() => setDeliverySchool({ showModal: false })}><CloseOutlined /></button>
                </div>
                <h2>Delivery Summary</h2>
                <p>id : {schoolData.data.placeId}</p>
                <p>Name of School : {schoolData.data.placeName}</p>
                <p>Address : {schoolData.data.placeAddress}</p>
                <p>Sum Amount Available : {schoolData.data.sum} Rs</p>
                {!books.errorOccured && <div className="books-input">
                    <div className="autocomplete-parent">
                        <Autocomplete
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Search Book"
                                />
                            )}
                            options={books}
                            getOptionLabel={option => option.code + "- " + option.description}
                            style={{ width: "100%" }}
                            onInputChange={(event, newInputValue) =>
                                searchByCode(newInputValue)
                            }
                            onChange={addBooksForDelivery}
                            getOptionDisabled={option => {
                                let arr = selectedBooks.filter(({ code }) => code === option.code)
                                return arr.length > 0
                            }}

                        />
                    <Autocomplete
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Enter book name"
                            />
                        )}
                        options={books}
                        getOptionLabel={(option) => option.code + '- ' + option.description}
                        style={{ width: "100%" }}
                        onInputChange={(event, newInputValue) =>
                            searchByName(newInputValue)
                        }
                        onChange={addBooksForDelivery}
                        getOptionDisabled={option => {
                            let arr = selectedBooks.filter(({ code }) => code === option.code)
                            return arr.length > 0
                        }}
                    />
                    </div>
                    <div className="selected-books-display">
                        <h3>{selectedBooks.length > 0 ?'Selected Books :' : "No Books Selected" }</h3>
                        {
                            selectedBooks.map(({ code, description, quantity }) => (
                                <div className="books-display" key={code}>
                                    <p>{code} : {description}</p>
                                    <div className="input-container">
                                        <input type="number" min={1} value={quantity} onChange={(e) => bookQuantityChanger(code, quantity = e.target.value)} />
                                        <button onClick={() => deleteSelectedBook(code)} className="delete-button">
                                            <DeleteOutlineRounded style={{ width: '2rem' }} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>}
                <TextField onChange={e => setDesc(e.target.value)} type = "text" label = "Delivery Description" variant="outlined" />
                <TextField onChange={(e) => setAmount(e.target.value)} type="number" label='Total Amount' variant="outlined" />
                <button onClick={() => {
                    createDelivery(setResponse , {
                        books : selectedBooks,
                        totalAmount : amount,
                        placeAddress : schoolData.data.placeAddress,
                        placeId : schoolData.data.placeId,
                        description : desc
                    })
                }} disabled = {selectedBooks.length <= 0} className="delivery-submit-btn">Process Delivery</button>
            </div>}
        </div>
    );
};

export default CreateDeliveryForm;
