export const USER_CART_KEY = "user_cart"

export const addToCart = (pharmacyId, medicineId) => {
    const myCart = getCart()
    let pharmacyIsExist = false;
    myCart.forEach((pharmacy)=>{
        if(pharmacy.id === pharmacyId) {
            pharmacyIsExist = true;
            pharmacy.medicines.push(medicineId)
        }
    });
    if(!pharmacyIsExist){
        myCart.push({id:pharmacyId,medicines:[medicineId]})
    }

    saveCart(myCart)
    return myCart
}

export const medicineIsExist = (medicineId) => {
    const myCart = getCart()
    let medicineIsExist = false;
    for (let i = 0; i < myCart.length;++i){
        medicineIsExist = myCart[i].medicines.includes(medicineId)
        if(medicineIsExist){
            console.log(medicineIsExist,medicineId,  myCart[i].id,  myCart[i])
            return true;
        }
    }
    return false;
}

export const removeMedicineFromCart = (pharmacyId, medicineId) => {
    let myCart = getCart()
    myCart.forEach((pharmacy)=>{
        if(pharmacy.id === pharmacyId) {
            pharmacy.medicines = pharmacy.medicines.filter((medicine)=> medicine !== medicineId)
        }
    });
    myCart = myCart.filter(pharmacy => pharmacy.medicines.length > 0)
    saveCart(myCart)
    return myCart
}

export const removePharmacyFromCart = (pharmacyId) => {
    let myCart = getCart()
    myCart = myCart.filter((pharmacy)=> pharmacy.id !== pharmacyId)
    saveCart(myCart)
}

export const getCart = () => {
    return JSON.parse(localStorage.getItem(USER_CART_KEY)) || [];
}

export const deleteCart = () => {
    localStorage.removeItem(USER_CART_KEY)
}


const saveCart = (myCart) =>{
    localStorage.setItem(USER_CART_KEY, JSON.stringify(myCart));
}

