import React from 'react'
import './PhotoGallery.css'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function PhotoGallery() {
    return (
        <div className='photogallery-container'>
            <h1 className='photogallery-title'>TOP BOOK COLLECTION</h1>
            <div className="photogallery-images">
                <img src="https://standardebooks.org/images/covers/c-kay-scott_blind-mice-aee53ced-cover.avif" alt=''/>
                <img src="https://standardebooks.org/images/covers/sigrid-undset_the-bridal-wreath_charles-archer_j-s-scott-c5399df4-cover.avif" alt=''/>
                <img src="https://standardebooks.org/images/covers/woodrow-wilson_the-new-freedom-c5399df4-cover.avif" alt=''/>
                <img src="https://standardebooks.org/images/covers/zofia-nalkowska_women_michael-henry-dziewicki-c5399df4-cover.avif" alt=''/>
                <img src="https://standardebooks.org/images/covers/j-s-fletcher_the-paradise-mystery-c5399df4-cover.avif" alt=''/>
                <img src="https://standardebooks.org/images/covers/freeman-wills-crofts_the-box-office-murders-c5399df4-cover.avif" alt=''/>
                <img src="https://standardebooks.org/images/covers/ellery-queen_the-roman-hat-mystery-c5399df4-cover.avif" alt=''/>
                <img src="https://standardebooks.org/images/covers/georgette-heyer_simon-the-coldheart-c5399df4-cover.avif" alt=''/>
                <img src="https://standardebooks.org/images/covers/p-g-wodehouse_the-small-bachelor-c5399df4-cover.avif" alt=''/>
                <img src="https://standardebooks.org/images/covers/edgar-wallace_the-crimson-circle-c5399df4-cover.avif" alt=''/>
                <img src="https://standardebooks.org/images/covers/lord-dunsany_the-book-of-wonder_sidney-h-sime-4656b372-cover.avif" alt=''/>
                <img src="https://standardebooks.org/images/covers/david-park-barnitz_the-book-of-jade-4656b372-cover.avif" alt=''/>
            </div>
            <button>VIEW MORE<ArrowForwardIosIcon style={{fontSize:20}}/></button>
        </div>
    )
}

export default PhotoGallery