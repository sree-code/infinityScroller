
const imagecontainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const apiKey = '4Tf7izW_1VkpKEoFj_MR5d5dX0GeO3dZzhNaaZiy1Zo';
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

function photosLoaded(){
    console.log('loaded Imagers are');
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes){
    for( const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos(){
    // for each method for each photo from api
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log(totalImages);
    photosArray.forEach((photo) => {
        // Create a new <a> element for each photo
        const item = document.createElement("a");
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item,{
            href:  photo.links.html,
            target: '_blank',
        });
        // Create an <img> element for each photo
        const img = document.createElement("img");
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('onload', photosLoaded);
        // put <img> tag inside <a> tag both inside imageContainer
        item.appendChild(img);
        imagecontainer.appendChild(item);
     });
}

async function getPhotos(){
    try{
        // fetch(apiUrl)
        // .then(function(response){
        //     return response.json();
        // })
        // .then(function(data){
        //     console.log(data);
        // })
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();
    }catch(err){

    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
       ready = false;
        getPhotos();
        console.log("load more");
    }
})

getPhotos();