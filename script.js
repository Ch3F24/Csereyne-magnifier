document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.querySelector('.zooming-container');
    const sharpSpot = document.querySelector('.sharp-spot');
    const image = document.querySelector('.blurred-image');
    const slides = document.querySelectorAll('.swiper-slide');
    const langSelector = document.querySelectorAll('.lang-selector-item');
    const description = document.querySelector('.image-description');
    
    let zoomLevel = 1.5;
    const zoomFactor = 0.1;
    const sharpSpotSize = 280; // Assuming sharpSpot is 300x300
    let activeIndex = 0
    let lang = document.querySelector('html').getAttribute('lang');

    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    imageContent(activeIndex)

    imageContainer.addEventListener('touchmove', zooming);
    imageContainer.addEventListener('touchmove', (event) => {
        event.preventDefault(); // Prevent scrolling
        zooming(event);
    });
    // imageContainer.addEventListener('touchmove', zooming);

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);

        };
    }

    function toggleBlur() {
        image.classList.remove('disable-blur')
    }

    const toggleBlurDebounced = debounce(toggleBlur, 100);

    function getPosition(event) {
        let x, y;
        if (event.touches) {
            const rect = imageContainer.getBoundingClientRect();
            x = event.touches[0].clientX - rect.left;
            y = event.touches[0].clientY - rect.top;
        } else {
            x = event.offsetX;
            y = event.offsetY;
        }
        return { offsetX: x, offsetY: y };
    }

    function zooming(event) {
        event.preventDefault(); // Prevent scrolling
        image.classList.add('disable-blur')
        toggleBlurDebounced()

        const { offsetX, offsetY } = getPosition(event);


        const left = Math.min(Math.max(0, offsetX - sharpSpotSize / 2), imageContainer.clientWidth - sharpSpotSize);
        const top = Math.min(Math.max(0, offsetY - sharpSpotSize / 2), imageContainer.clientHeight - sharpSpotSize);

        // sharpSpot.style.left = `${left}px`;
        // sharpSpot.style.top = `${top}px`;
        // sharpSpot.style.backgroundImage = `url('${image.src}')`;
        // // sharpSpot.style.backgroundPosition = `-${left * zoomLevel}px -${top * zoomLevel}px`;
        // sharpSpot.style.backgroundPosition = `-${(offsetX * zoomLevel) - (sharpSpotSize / 2)}px -${(offsetY * zoomLevel) - (sharpSpotSize / 2)}px`;
        // sharpSpot.style.backgroundSize = `${imageContainer.clientWidth * zoomLevel}px ${imageContainer.clientHeight * zoomLevel}px`;

        sharpSpot.style.left = `${left}px`;
        sharpSpot.style.top = `${top}px`;
        sharpSpot.style.backgroundImage = `url('${image.src}')`;
        sharpSpot.style.backgroundPosition = `-${(offsetX * zoomLevel) - (sharpSpotSize / 2)}px -${(offsetY * zoomLevel) - (sharpSpotSize / 2)}px`;
        sharpSpot.style.backgroundSize = `${imageContainer.clientWidth * zoomLevel}px ${imageContainer.clientHeight * zoomLevel}px`;
    };

    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
    
            const activeSource = slides[index].dataset.image;
            activeIndex = index;
            
            if(activeSource) {
                image.src = 'images/' + activeSource;
                sharpSpot.style.backgroundImage = `url('${image.src}')`;
                sharpSpot.style.left = `0px`;
                sharpSpot.style.top = `0px`;
                imageContent(index);
            }
        });
    });

    langSelector.forEach((item, index) => {
        item.addEventListener('click', () => {
            const activeLang = item.dataset.lang;
            lang = activeLang;
            
            if(activeLang) {
                document.querySelector('html').setAttribute('lang', activeLang);
                imageContent(index)
            }
        });
    });

    function imageContent(index) {
        const content = data[index][lang];
        description.innerHTML = `<strong>${content.title}</strong> ${content.description}`;
    }
});



const data = [
    {
        "hu": {
            "title": "Bem tábornok érdemkeresztje,",
            "description": "Kossuth Lajos adománya. Megsemmisült 1945-ben."
        },
        "ro": {
            "title": "Crucea de Merit a Generalului Bem,",
            "description": "Donată de Lajos Kossuth, distrusă în 1945."
        },
        "en": {
            "title": "General Bem’s Order of Merit,",
            "description": "Donated by Lajos Kossuth. Destroyed in 1945."
        }
    },
    {
        "hu": {
            "title": "Bem tábornok érdemkeresztje,",
            "description": "Kossuth Lajos adománya. Megsemmisült 1945-ben."
        },
        "ro": {
            "title": "Crucea de Merit a Generalului Bem,",
            "description": "Donată de Lajos Kossuth, distrusă în 1945."
        },
        "en": {
            "title": "General Bem’s Order of Merit,",
            "description": "Donated by Lajos Kossuth. Destroyed in 1945."
        }
    },
    {
        "hu": {
            "title": "A Kossuth Lajos által címzett levélboríték,",
            "description": "Azon adománylevél szövege, mellyel a Bem érdemkeresztjét a Székely Nemzeti Múzeumnak adományozta. Az eredeti levél megsemmisült 1945-ben."
        },
        "ro": {
            "title": "Plicul adresat de Lajos Kossuth,",
            "description": "Textul scrisorii de donație prin care acesta a donat Crucea de Merit a lui Bem Muzeului Național Secuiesc. Scrisoarea originală a fost distrusă în 1945."
        },
        "en": {
            "title": "Envelope addressed by Lajos Kossuth,",
            "description": "Text of the donation letter with which the Order of Merit of General Bem was donated to the Székely National Museum. The original letter was destroyed in 1945."
        }
    },
    {
        "hu": {
            "title": "Felvidéki ónmázas kanna,",
            "description": "A Cserey család gyűjteményéből. Megsemmisült 1945-ben."
        },
        "ro": {
            "title": "Ulcior cu glazură de cositor,",
            "description": "Din Ungaria de Sus, din colecția familiei Cserey. Distrus în 1945."
        },
        "en": {
            "title": "Tin glazed kettle,",
            "description": "From Upper Hungary, from the Cserey family collection. Destroyed in 1945."
        }
    },
    {
        "hu": {
            "title": "Az elpusztult Daniel-láda,",
            "description": "Ismeretlen fényképész felvétele, 1930-as évek."
        },
        "ro": {
            "title": "Lada cu comori a familiei Daniel,",
            "description": "Fotograf necunoscut, anii 1930."
        },
        "en": {
            "title": "The destroyed Daniel family chest,",
            "description": "Unknown photograph, 1930s."
        }
    },
    {
        "hu": {
            "title": "Az elpusztult Daniel-láda,",
            "description": "Ismeretlen fényképész felvétele, 1930-as évek."
        },
        "ro": {
            "title": "Lada cu comori a familiei Daniel,",
            "description": "Fotograf necunoscut, anii 1930."
        },
        "en": {
            "title": "The destroyed Daniel family chest,",
            "description": "Unknown photograph, 1930s."
        }
    },
    {
        "hu": {
            "title": "Az elpusztult Daniel-láda,",
            "description": "Ismeretlen fényképész felvétele, 1930-as évek."
        },
        "ro": {
            "title": "Lada cu comori a familiei Daniel,",
            "description": "Fotograf necunoscut, anii 1930."
        },
        "en": {
            "title": "The destroyed Daniel family chest,",
            "description": "Unknown photograph, 1930s."
        }
    },
    {
        "hu": {
            "title": "1945-ben megsemmisült könyvek,",
            "description": "Fotofilm felvétele, 1940-es évek."
        },
        "ro": {
            "title": "Cărți distruse în 1945,",
            "description": "Fotografie de Fotofilm, anii 1940."
        },
        "en": {
            "title": "Books destroyed in 1945,",
            "description": "Photograph: Fotofilm, 1930s."
        }
    },
    {
        "hu": {
            "title": "Hodgyai ónkanna,",
            "description": "Megsemmisült 1945-ben. Ismeretlen fényképész felvétele, 1930-as évek."
        },
        "ro": {
            "title": "Cană de cositor din Hoghia,",
            "description": "Distrusă în 1945. Fotograf necunoscut, anii 1930."
        },
        "en": {
            "title": "Tin pot from Hodgya (Hoghia),",
            "description": "Destroyed in 1945. Unknown photograph, 1930s."
        }
    },
    {
        "hu": {
            "title": "Hodgyai ónkanna,",
            "description": "Megsemmisült 1945-ben. Ismeretlen fényképész felvétele, 1930-as évek."
        },
        "ro": {
            "title": "Cană de cositor din Hoghia,",
            "description": "Distrusă în 1945. Fotograf necunoscut, anii 1930."
        },
        "en": {
            "title": "Tin pot from Hodgya (Hoghia),",
            "description": "Destroyed in 1945. Unknown photograph, 1930s."
        }
    },
    {
        "hu": {
            "title": "Hodgyai ónkanna,",
            "description": "Megsemmisült 1945-ben. Ismeretlen fényképész felvétele, 1930-as évek."
        },
        "ro": {
            "title": "Cană de cositor din Hoghia,",
            "description": "Distrusă în 1945. Fotograf necunoscut, anii 1930."
        },
        "en": {
            "title": "Tin pot from Hodgya (Hoghia),",
            "description": "Destroyed in 1945. Unknown photograph, 1930s."
        }
    },
    {
        "hu": {
            "title": "Hodgyai ónkanna,",
            "description": "Megsemmisült 1945-ben. Ismeretlen fényképész felvétele, 1930-as évek."
        },
        "ro": {
            "title": "Cană de cositor din Hoghia,",
            "description": "Distrusă în 1945. Fotograf necunoscut, anii 1930."
        },
        "en": {
            "title": "Tin pot from Hodgya (Hoghia),",
            "description": "Destroyed in 1945. Unknown photograph, 1930s."
        }
    },
    {
        "hu": {
            "title": "Hodgyai ónkanna,",
            "description": "Megsemmisült 1945-ben. Ismeretlen fényképész felvétele, 1930-as évek."
        },
        "ro": {
            "title": "Cană de cositor din Hoghia,",
            "description": "Distrusă în 1945. Fotograf necunoscut, anii 1930."
        },
        "en": {
            "title": "Tin pot from Hodgya (Hoghia),",
            "description": "Destroyed in 1945. Unknown photograph, 1930s."
        }
    },
    {
        "hu": {
            "title": "Kötélverő céh kannája 1740-ből,",
            "description": "Megsemmisült 1945-ben. Gödri Ferenc felvétele, 1932."
        },
        "ro": {
            "title": "Ulcior al breslei funarilor, din 1740,",
            "description": "Distrus în 1945. Fotograf: Ferenc Gödri, 1932."
        },
        "en": {
            "title": "Tankard of the rope makers’ guild, dated 1740",
            "description": "Destroyed in 1945. Photograph: Ferenc Gödri, 1932."
        }
    },
    {
        "hu": {
            "title": "Lőportartó szaru szarvasos díszítéssel.",
            "description": "Megsemmisült 1945-ben"
        },
        "ro": {
            "title": "Corn pentru praf de pușcă cu motiv de cerb.",
            "description": "Distrusă în 1945"
        },
        "en": {
            "title": "Powder-horn with deer ornament,",
            "description": "destroyed in 1945"
        }
    },
    {
        "hu": {
            "title": "Lőportartó szaru.",
            "description": "Megsemmisült 1945-ben"
        },
        "ro": {
            "title": "Corn pentru praf de pușcă.",
            "description": "Distrusă în 1945"
        },
        "en": {
            "title": "Powder-horn,",
            "description": "destroyed in 1945"
        }
    },
    {
        "hu": {
            "title": "Lőportartó szaru,",
            "description": "1709-ből, Csereyné gyűjtése Zathureczky Bertától. Megsemmisült 1945-ben"
        },
        "ro": {
            "title": "Corn pentru praf de pușcă,",
            "description": "datat 1709. Colectat de la Berta Zathureczky. Distrusă în 1945"
        },
        "en": {
            "title": "Powder-horn,",
            "description": "dated 1709, destroyed in 1945. Collected byMrs. Cserey from Berta Zathureczky"
        }
    },
    {
        "hu": {
            "title": "Lőportartó szaru 1762-ből,",
            "description": "vásár Szűcs Mihálytól. Megsemmisült 1945-ben"
        },
        "ro": {
            "title": "Corn pentru praf de pușcă datat 1762,",
            "description": "achiziție de la Mihály Szűcs. Distrusă în 1945"
        },
        "en": {
            "title": "Powder-horn, dated 1762,",
            "description": "purchased from Mihály Szűcs. Destroyed in 1945"
        }
    },
    {
        "hu": {
            "title": "Lőportartó szaru 1719-ből,",
            "description": "Megsemmisült 1945-ben"
        },
        "ro": {
            "title": "Corn pentru praf de pușcă datat 1719,",
            "description": "Distrusă în 1945"
        },
        "en": {
            "title": "Powder-horn, dated 1719,",
            "description": "Destroyed in 1945"
        }
    },
    {
        "hu": {
            "title": "Régi ónedények,",
            "description": "Megsemmisültek 1945-ben. K. Sebestyén József felvétele, 1932"
        },
        "ro": {
            "title": "Piese vechi din cositor,",
            "description": "Distruse în 1945. Fotograf: József K. Sebestyén, 1932"
        },
        "en": {
            "title": "Old tin vessels,",
            "description": "Destroyed in 1945. Photograph: József K. Sebestyén, 1932"
        }
    },
    {
        "hu": {
            "title": "Cserépkulacs 1832-ből,",
            "description": "Csereyné vásárolta ismeretlen helyről. Megsemmisült 1945-ben"
        },
        "ro": {
            "title": "Ploscă de ceramică din 1832,",
            "description": "Achiziție de d-na Cserey din loc necunoscut. Distrusă în 1945"
        },
        "en": {
            "title": "Ceramic bottle, dated 1832,",
            "description": "Mrs. Cserey’s purchase from an unknown location. Destroyed in 1945"
        }
    },
    {
        "hu": {
            "title": "Háromszéki keresztszemes hímzés.",
            "description": "Megsemmisült 1945-ben"
        },
        "ro": {
            "title": "Broderie încruci din Trei Scaune,",
            "description": "distrusă în 1945"
        },
        "en": {
            "title": "Cross-stitch embroidery from Háromszék.",
            "description": "Destroyed in 1945"
        }
    },
    {
        "hu": {
            "title": "Kályhacsempe,",
            "description": "1687-ből. Csereyné gyűjtése Imecsfalváról. László József rajza. Megsemmisült 1945-ben"
        },
        "ro": {
            "title": "Cahlă datată,",
            "description": "1687. Colectat de d-na Cserey din Imeni. Distrusă în 1945. Desen de JózsefLászló"
        },
        "en": {
            "title": "Stove tiles,",
            "description": "dated 1687. Collected by Mrs. Cserey from Imeni/Imecsfalva. Destroyed in 1945. Drawing by JózsefLászló"
        }
    },
    {
        "hu": {
            "title": "Nemesfém csésze,",
            "description": "a Cserey család birtokából került a múzeumba. Megsemmisült 1945-ben. Cserey Gyula rajza"
        },
        "ro": {
            "title": "Ceașcă din metal prețios,",
            "description": "a ajuns în muzeu din colecția Cserey. Distrusă în 1945. Desen de Gyula Cserey"
        },
        "en": {
            "title": "Cup of precious metal,",
            "description": "from the collection of the Cserey family. Destroyed in 1945. Drawing by Gyula Cserey"
        }
    },
    {
        "hu": {
            "title": "Emberalakú serleg,",
            "description": "a Cserey család birtokából került a múzeumba. Megsemmisült 1945-ben. Cserey Gyula rajza"
        },
        "ro": {
            "title": "Cupă antropomorfă,",
            "description": "a ajuns în muzeu din colecția Cserey. Distrusă în 1945. Desen de Gyula Cserey"
        },
        "en": {
            "title": "Anthropomorph cup,",
            "description": "from the collection of the Cserey family. Destroyed in 1945. Drawing by Gyula Cserey"
        }
    },
    {
        "hu": {
            "title": "Kínai tányér,",
            "description": "a Cserey család birtokából került a múzeumba. Megsemmisült 1945-ben. Cserey Gyula rajza"
        },
        "ro": {
            "title": "Farfurie chinezească,",
            "description": "a ajuns în muzeu din colecția Cserey. Distrusă în 1945. Desen de Gyula Cserey"
        },
        "en": {
            "title": "Chinese plate,",
            "description": "from the collection of the Cserey family. Destroyed in 1945. Drawing by Gyula Cserey"
        }
    },
    {
        "hu": {
            "title": "Ónmázas tányér,",
            "description": "a Cserey család birtokából került a múzeumba. Megsemmisült 1945-ben. Cserey Gyula rajza"
        },
        "ro": {
            "title": "Farfurie cu glazură de cositor,",
            "description": "a ajuns în muzeu din colecția Cserey. Distrusă în 1945. Desen de Gyula Cserey"
        },
        "en": {
            "title": "Tin glazed plate,",
            "description": "from the collection of the Cserey family. Destroyed in 1945. Drawing by Gyula Cserey"
        }
    },
    {
        "hu": {
            "title": "Ónmázas kupa,",
            "description": "a Cserey család birtokából került a múzeumba. Megsemmisült 1945-ben. Cserey Gyula rajza"
        },
        "ro": {
            "title": "Cupă cu glazură de cositor,",
            "description": "a ajuns în muzeu din colecția Cserey. Distrusă în 1945. Desen de Gyula Cserey"
        },
        "en": {
            "title": "Tin glazed cup,",
            "description": "from the collection of the Cserey family. Destroyed in 1945. Drawing by Gyula Cserey"
        }
    },
    {
        "hu": {
            "title": "Tolózáras pénzes láda,",
            "description": "a Cserey család birtokából került a múzeumba. Megsemmisült 1945-ben. Cserey Gyula rajza"
        },
        "ro": {
            "title": "Lădiță pentru bani cu capac glisant,",
            "description": "a ajuns în muzeu din colecția Cserey. Distrusă în 1945. Desen de Gyula Cserey"
        },
        "en": {
            "title": "Sliding-lid jewelry box,",
            "description": "from the collection of the Cserey family. Destroyed in 1945. Drawing by Gyula Cserey"
        }
    },
    {
        "hu": {
            "title": "Ónmázas kanta,",
            "description": "a Cserey család birtokából került a múzeumba. Megsemmisült 1945-ben. Cserey Gyula rajza"
        },
        "ro": {
            "title": "Cantă cu glazură de cositor,",
            "description": "a ajuns în muzeu din colecția Cserey. Distrusă în 1945. Desen de Gyula Cserey"
        },
        "en": {
            "title": "Tin-glazed vessel,",
            "description": "from the collection of the Cserey family. Destroyed in 1945. Drawing by Gyula Cserey"
        }
    },
    {
        "hu": {
            "title": "Hímzés,",
            "description": "Csereyné magángyűjteményéből, illyésmezői gyűjtés. Roediger Lajos rajza. Néprajzi Múzeum, Budapest, Rajztár"
        },
        "ro": {
            "title": "Broderie,",
            "description": "din colecția particulară a d-nei Cserey, de proveniență din Ilieși. Desen de Lajos Roediger. Colecția Muzeului de Etnografie din Budapesta, secția Desene"
        },
        "en": {
            "title": "Embroidery,",
            "description": "from the collection of Mrs Cserey from Ilieși/Illyésmező. Drawing by Lajos Roediger. Collection of the Museum of Ethnography Budapest, Collection of drawings"
        }
    },
    {
        "hu": {
            "title": "Hímzés,",
            "description": "Csereyné magángyűjteményéből. Roediger Lajos rajza. Néprajzi Múzeum, Budapest, Rajztár"
        },
        "ro": {
            "title": "Broderie,",
            "description": "din colecția particulară a d-nei Cserey. Desen de Lajos Roediger. Colecția Muzeului de Etnografie din Budapesta, secția Desene"
        },
        "en": {
            "title": "Embroidery,",
            "description": "from the collection of Mrs Cserey. Drawing by Lajos Roediger. Collection of the Museum of Ethnography Budapest, Collection of drawings"
        }
    },
    {
        "hu": {
            "title": "Hímzés,",
            "description": "Csereyné gyűjtése és adománya. Megsemmisült 1945-ben. Roediger Lajos rajza. Néprajzi Múzeum, Budapest, Rajztár"
        },
        "ro": {
            "title": "Broderie,",
            "description": "colectat și donat muzeului de către d-na Cserey, distrusă în 1945. Desen de Roediger Lajos. Colecția Muzeului de Etnografie din Budapesta, secția Desene"
        },
        "en": {
            "title": "Embroidery,",
            "description": "collected and gift of Mrs Cserey. Destroyed in 1945. Drawing by Lajos Roediger. Collection of the Museum of Ethnography Budapest, Collection of drawings"
        }
    },
    {
        "hu": {
            "title": "Hímzés,",
            "description": "Csereyné gyűjtése és adománya. Megsemmisült 1945-ben. Roediger Lajos rajza. Néprajzi Múzeum, Budapest, Rajztár"
        },
        "ro": {
            "title": "Broderie,",
            "description": "colectat și donat muzeului de către d-na Cserey, distrusă în 1945. Desen de Lajos Roediger. Colecția Muzeului de Etnografie din Budapesta, secția Desene"
        },
        "en": {
            "title": "Embroidery,",
            "description": "collected and gift of Mrs Cserey. Destroyed in 1945. Drawing by Lajos Roediger. Collection of the Museum of Ethnography Budapest, Collection of drawings"
        }
    },
    {
        "hu": {
            "title": "Hímzés,",
            "description": "Csereyné gyűjtése és adománya. Megsemmisült 1945-ben. Roediger Lajos rajza. Néprajzi Múzeum, Budapest, Rajztár"
        },
        "ro": {
            "title": "Broderie,",
            "description": "colectat și donat muzeului de către d-na Cserey, distrusă în 1945. Desen de Lajos Roediger. Colecția Muzeului de Etnografie din Budapesta, secția Desene"
        },
        "en": {
            "title": "Embroidery,",
            "description": "collected and gift of Mrs Cserey. Destroyed in 1945. Drawing by Lajos Roediger. Collection of the Museum of Ethnography Budapest, Collection of drawings"
        }
    },
    {
        "hu": {
            "title": "Hímzés,",
            "description": "Csereyné magángyűjteményéből. Roediger Lajos rajza. Néprajzi Múzeum, Budapest, Rajztár"
        },
        "ro": {
            "title": "Broderie,",
            "description": "din colecția particulară a d-nei Cserey. Desen de Lajos Roediger. Colecția Muzeului de Etnografie din Budapesta, secția Desene"
        },
        "en": {
            "title": "Embroidery,",
            "description": "from the collection of Mrs Cserey. Drawing by Lajos Roediger. Collection of the Museum of Ethnography Budapest, Collection of drawings"
        }
    },
    {
        "hu": {
            "title": "Hímzés,",
            "description": "Csereyné gyűjtése és adománya. Megsemmisült 1945-ben. Roediger Lajos rajza. Néprajzi Múzeum, Budapest, Rajztár"
        },
        "ro": {
            "title": "Broderie,",
            "description": "colectat și donat muzeului de către d-na Cserey, distrusă în 1945. Desen de Lajos Roediger. Colecția Muzeului de Etnografie din Budapesta, secția Desene"
        },
        "en": {
            "title": "Embroidery,",
            "description": "collected and gift of Mrs Cserey. Destroyed in 1945. Drawing by Lajos Roediger. Collection of the Museum of Ethnography Budapest, Collection of drawings"
        }
    }
]