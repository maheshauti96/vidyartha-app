import { Icon } from '@material-ui/core';
import { CloseSharp } from '@material-ui/icons';
import Link from 'next/link';
import React , {useRef , useEffect} from 'react'

const FindSchoolModal = ({
  setShow , 
  schools , 
  orgCode , 
  setPageToken , 
  pageToken,
  showLoadMore,
  onLoadMore,
}) => {
    const componentRef = useRef(null);
    console.log(schools)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className='find-school-modal'>
        <div>
        
        <div ref={componentRef} className='find-school-main'>
            <h2 className='find-school-title'>Here are the schools we could find</h2>
            <button onClick={() => setShow(false)} className='close-button'><CloseSharp/></button>
            <ul>
            {
                schools.map(({name , place_id}) => <li>
                    <Link href={`${orgCode}/campaigns/${
                    place_id
                  }`} >{name}</Link>
                </li>)
            }
            </ul>
            {showLoadMore && <button className='load-more-button' type='button' onClick={onLoadMore}>Load More</button>}
        </div>
        </div>
    </div>
  )
}

export default FindSchoolModal