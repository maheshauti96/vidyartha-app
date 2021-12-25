import Head from 'next/head';
import { Button, TextField } from "@material-ui/core";
import Image from 'next/image';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ArrowForwardIos } from '@material-ui/icons';

export default function Home() {
  return (
    <div className="home-wrap">
      <Head>
        <title>Vidyartha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <div className="banner-wrap center-align position-relative">
          <img className="position-absolute logo-image" height="120px" width="200px" src="/logo.png" />
          <h1>Help Us To Donate Books For Your School!</h1>
          <div className="search-box-wrap">
            <TextField label="Find your city" variant="outlined" />
            <Autocomplete
              disablePortal
              noOptionsText={'No Options'}
              width={'346px'}
              options={[{ name: 'sdfs', value: 'dsf' }]}
              // onChange={(event, value) => selectedValue(event, value)}
              getOptionLabel={(option) => option.name.toString()}
              sx={{ width: 346 }}
              renderInput={(params) => <TextField {...params} label="Find your school"
                onChange={() => { }} variant="outlined"
              />}
            />
            <Button
              className="primary-button"
              // onClick={() => {
              //   if (finalPlace) {
              //     navigate(`/fundraiser/${finalPlace.place_id}`);
              //   } else {
              //     alert('Please Select the school')
              //   }
              // }}
              variant="contained"
              endIcon={<ArrowForwardIos />}
            >Donate Now</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
