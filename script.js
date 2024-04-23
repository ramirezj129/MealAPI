const mealInput = document.querySelector(".mealInput");
const searchForm = document.querySelector(".searchForm");
const card = document.querySelector(".card");

searchForm.addEventListener("submit", async event => {
    event.preventDefault();
    const mealName = mealInput.value.trim(); 

    if(mealName !== '') {
        try {
            const mealRecipeData = await getMealRecipe(mealName);
            displayMealData(mealRecipeData);
        } catch (error) {
            console.log(error);  
        }
    } else {
        alert("Enter a meal name");
    }
});

async function getMealRecipe(name) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch meal recipe');
    } 

    return await response.json();
}

function displayMealData(data) {
    console.log(data);
    const { meals } = data;
    if (meals && meals.length > 0) {
        const { strMeal: meal, strInstructions: instructions, strArea: mealType , strMealThumb: mealThumb} = meals[0];

        card.innerHTML = ""; // Clear existing content

        const mealThumbnail = document.createElement("img");
        mealThumbnail.src = `${mealThumb}/preview`;
        mealThumbnail.classList.add("card-img"); 
        card.appendChild(mealThumbnail);

        const mealCategory = document.createElement("p");
        mealCategory.textContent = `Meal Type: ${mealType}`;
        card.appendChild(mealCategory);


        const mealDisplay = document.createElement("h2");
        mealDisplay.textContent = meal;
        card.appendChild(mealDisplay);

        const mealInstructions = document.createElement("p");
        mealInstructions.textContent = instructions;
        card.appendChild(mealInstructions);

       

        card.style.display = "flex"; // Display the card
    } else {
        card.textContent = "Meal not found";
    }
}


function getMealEmoji(mealId){
    // Implement this function to get the emoji for the meal based on its ID
}
