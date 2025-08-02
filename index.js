let allImages = document.querySelectorAll('.image');
const imageArray = Array.from(allImages);
let imageButtons = document.querySelectorAll('.imageButton');
const buttonsArray = Array.from(imageButtons);

let currentIMG = 0;
let timeout = setTimeout( moveRight, 5000 );
const carouselButtons = document.querySelector('.carouselButtons');
carouselButtons.addEventListener('click', (event)=>{
  if ( event.target.closest('.lastImage')) {
    moveLeft ( );

  } else if ( event.target.closest('.nextImage') ) {
    moveRight ( );

  } else if ( event.target.closest('.imageButton') && !event.target.closest('.imageButton').classList.contains('active')) {
    let buttonID = event.target.closest('.imageButton').id;
    let newIMG;
    for ( let i = 0; i < imageArray.length; i++ ) {
      if ( imageArray[i].classList.contains(buttonID) ) { 
        newIMG = i;
        break;
      }
    }
    while ( currentIMG > newIMG ) {
      moveLeft ( );
    }
    while ( currentIMG < newIMG ) {
      moveRight ( );
    }
  }
});

function moveLeft ( ) {
  clearTimeout(timeout);
  let hiddenToLeft = currentIMG - 2;
  let leftToActive = currentIMG - 1;
  let rightToHidden = currentIMG + 1;

  if ( currentIMG === 0 ) {
    hiddenToLeft = imageArray.length-2;
    leftToActive = imageArray.length-1;
  } else if ( currentIMG === 1 ) {
    hiddenToLeft = imageArray.length-1;
  } else if ( currentIMG === imageArray.length-1 ) {
    rightToHidden = 0;
  }

  imageArray[hiddenToLeft].classList.remove('hidden');
  imageArray[hiddenToLeft].classList.add('left');

  imageArray[leftToActive].classList.remove('left');
  imageArray[leftToActive].classList.add('active');

  imageArray[currentIMG].classList.remove('active');
  imageArray[currentIMG].classList.add('right');

  imageArray[rightToHidden].classList.remove('right');
  imageArray[rightToHidden].classList.add('hidden');

  buttonsArray[currentIMG].classList.remove('active');
  if ( currentIMG === 0 ) {
    currentIMG = imageArray.length-1;
  } else {
    currentIMG--;
  }
  buttonsArray[currentIMG].classList.add('active');
  timeout = setTimeout( moveRight, 5000 );
}

function moveRight ( ) {
  clearTimeout(timeout);
  let leftToHidden = currentIMG - 1;
  let rightToActive = currentIMG + 1;
  let hiddenToRight = currentIMG + 2;
  if ( currentIMG === 0 ) {
    leftToHidden = imageArray.length-1;
  } else if ( currentIMG === imageArray.length-2 ) {
    hiddenToRight = 0;
  } else if ( currentIMG === imageArray.length-1 ) {
    rightToActive = 0;
    hiddenToRight = 1;
  }

  imageArray[leftToHidden].classList.remove('left');
  imageArray[leftToHidden].classList.add('hidden');

  imageArray[currentIMG].classList.remove('active');
  imageArray[currentIMG].classList.add('left');

  imageArray[rightToActive].classList.remove('right');
  imageArray[rightToActive].classList.add('active');

  imageArray[hiddenToRight].classList.remove('hidden');
  imageArray[hiddenToRight].classList.add('right');

  buttonsArray[currentIMG].classList.remove('active');
  if ( currentIMG == imageArray.length-1 ) {
    currentIMG = 0;
  } else {
    currentIMG++;
  }
  buttonsArray[currentIMG].classList.add('active');

  timeout = setTimeout( moveRight, 5000 );
}
