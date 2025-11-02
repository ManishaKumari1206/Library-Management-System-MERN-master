// import React from "react";
// import "./Allbooks.css";

// function Allbooks() {
//   return (
//     <div className="books-page">
//       <div className="books">
//         <div className="book-card">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp16xiXu1ZtTzbLy-eSwEK4Ng6cUpUZnuGbQ&usqp=CAU"
//             alt=""
//           ></img>
//           <p className="bookcard-title">Wings Of Fire</p>
//           <p className="bookcard-author">By Pranavdhar</p>
//           <div className="bookcard-category">
//             <p>Auto Biography</p>
//           </div>
//           <div className="bookcard-emptybox"></div>
//         </div>
//         <div className="book-card">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Rb2t6jA5ml7n57qdTZbAOWX1qSfsLCbaOA&usqp=CAU"
//             alt=""
//           ></img>
//           <p className="bookcard-title">The Power Of Your Subconscious Mind</p>
//           <p className="bookcard-author">By Joseph</p>
//           <div className="bookcard-category">
//             <p>Psychology</p>
//           </div>
//           <div className="bookcard-emptybox"></div>
//         </div>
//         <div className="book-card">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRFiDRQ7a-Oo-CnMmnbIMApP1Cq9B5bYx-UA&usqp=CAU"
//             alt=""
//           ></img>
//           <p className="bookcard-title">Elon Musk</p>
//           <p className="bookcard-author">By Elon</p>
//           <div className="bookcard-category">
//             <p>Auto Biography</p>
//           </div>
//           <div className="bookcard-emptybox"></div>
//         </div>
//         <div className="book-card">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Rb2t6jA5ml7n57qdTZbAOWX1qSfsLCbaOA&usqp=CAU"
//             alt=""
//           ></img>
//           <p className="bookcard-title">The Subtle Art Of Not Giving A Fuck</p>
//           <p className="bookcard-author">By Mark Manson</p>
//           <div className="bookcard-category">
//             <p>COMIC</p>
//           </div>
//           <div className="bookcard-emptybox"></div>
          
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Allbooks;

import React from "react";
import "./Allbooks.css";

function Allbooks() {
  return (
    <div className="books-page">
      <div className="books">
        
        <div className="book-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp16xiXu1ZtTzbLy-eSwEK4Ng6cUpUZnuGbQ&usqp=CAU"
            alt="Wings Of Fire Cover"
          ></img>
          <p className="bookcard-title">Wings Of Fire</p>
          <p className="bookcard-author">By Pranavdhar</p>
          <div className="bookcard-category">
            <p>Auto Biography</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div>
        <div className="book-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Rb2t6jA5ml7n57qdTZbAOWX1qSfsLCbaOA&usqp=CAU"
            alt="The Power Of Your Subconscious Mind Cover"
          ></img>
          <p className="bookcard-title">The Power Of Your Subconscious Mind</p>
          <p className="bookcard-author">By Joseph</p>
          <div className="bookcard-category">
            <p>Psychology</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div>

        
        <div className="book-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRFiDRQ7a-Oo-CnMmnbIMApP1Cq9B5bYx-UA&usqp=CAU"
            alt="Elon Musk Cover"
          ></img>
          <p className="bookcard-title">Elon Musk</p>
          <p className="bookcard-author">By Elon</p>
          <div className="bookcard-category">
            <p>Auto Biography</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div>

        
        <div className="book-card">
          <img
            src="https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg"
            alt="Romeo and Juliet"
          ></img>
          <p className="bookcard-title">Romeo and Juliet</p>
          <p className="bookcard-author">By William Shakespeare</p>
          <div className="bookcard-category">
            <p>COMIC</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div>
      
        <div className="book-card">
          <img
            src="https://www.gutenberg.org/cache/epub/2554/pg2554.cover.medium.jpg" alt="Crime and Punishment"
          ></img>
          <p className="bookcard-title">Crime and Punishment</p>
          <p className="bookcard-author">by Fyodor Dostoyevsky</p>
          <div className="bookcard-category">
            <p>Classic</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div>

        
        <div className="book-card">
          <img
            src="https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg"
            alt="Alice's Adventures in Wonderland"
          ></img>
          <p className="bookcard-title">Alice's Adventures in Wonderland</p>
          <p className="bookcard-author">by Lewis Carroll</p>
          <div className="bookcard-category">
            <p>Mystery</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div>

      </div>
    </div>
  );
}

export default Allbooks;

