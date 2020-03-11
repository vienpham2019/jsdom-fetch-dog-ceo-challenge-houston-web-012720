const display_image = (images_array) => {
    let div = document.querySelector("#dog-image-container")
    for(let element of images_array){
        let image = document.createElement("img")
        image.src = element
        image.style.width = "20em"
        // image.style.height = "20em"
        div.append(image)
    }
}

const dog_breed_names = (hash) => {

    let button = document.querySelector("#filter-breed")

    button.addEventListener("click", ()=> {
        let ul = document.querySelector("#dog-breeds")
        ul.innerHTML = ""
        let filter_value = document.querySelector("#breed-dropdown").value 

        let array = Object.keys(hash).filter(key => hash[key].length >= 1).filter(dog_breed => dog_breed.charAt(0) === filter_value)

        for(let dog_name_key of array){
            let li = find_dog_name(dog_name_key,hash)
            ul.append(li)
        }
    })
} 

const find_dog_name = (key,hash) => {
    let li = document.createElement("li")
    li.innerText = key 
    li.style.fontSize = "20px"
    li.style.cursor = "pointer"
    li.setAttribute("data-name", key)
    li.id = key
    for(let dog_name of hash[key]){
        let p = document.createElement("p")
        p.innerText = dog_name
        li.append(p)
    }
    return li
}

const color_selection = () => {
    
    let ul = document.querySelector("#dog-breeds")
    ul.addEventListener("click", (e) => {
        let color_select_value = document.querySelector("#color-dropdown").value 

        let breed = document.getElementById(e.target.dataset.name)
        breed.style.color = color_select_value
    })
}

const take_data = () => {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json())
    .then(data => display_image(data.message))

    fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
    .then(data => dog_breed_names(data.message))

    color_selection()
}

take_data()




