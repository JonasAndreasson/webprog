function ViewIngredient(props){
    var name = window.location.href.split("/view-ingredient/")[1];
    let inventory = props.inventory;
    let ingredient = inventory[name];
    return(
        <div className="container col-12">
            <h3>Vegan: {ingredient.vegan ? 'yes' : 'no'}</h3>
            <h3>Glutenfree: {!ingredient.gluten ? 'yes' : 'no'}</h3>
            <h3>Lactosefree: {!ingredient.lactose ? 'yes' : 'no'}</h3>
        </div>
    );
}
export default ViewIngredient;
