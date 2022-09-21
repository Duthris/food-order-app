import { combineReducers } from '@reduxjs/toolkit';
import { adminReducer, loginReducer, restaurantReducer, 
    registerReducer, categoryReducer, categoryRestaurantReducer,
    menuReducer, voucherReducer, basketReducer, orderReducer, 
    addFoodToBasketReducer, removeFoodFromBasketReducer, addMenuFoodsToBasketReducer,
    resetBasketReducer, removeMenuFromBasketReducer, getRestaurantFoodsReducer, getUserAddressesReducer,
    convertBasketToOrderReducer, addAddressReducer, applyVoucherReducer
} from './index';

const reducers = combineReducers({
    admins: adminReducer,
    login: loginReducer,
    restaurants: restaurantReducer,
    register: registerReducer,
    categories: categoryReducer,
    categoryRestaurants: categoryRestaurantReducer,
    menus: menuReducer,
    vouchers: voucherReducer,
    basket: basketReducer,
    orders: orderReducer,
    addFoodToBasket: addFoodToBasketReducer,
    removeFoodFromBasket: removeFoodFromBasketReducer,
    addMenuFoodsToBasket: addMenuFoodsToBasketReducer,
    resetBasket: resetBasketReducer,
    removeMenuFromBasket: removeMenuFromBasketReducer,
    restaurantFoods: getRestaurantFoodsReducer,
    userAddresses: getUserAddressesReducer,
    convertBasketToOrder: convertBasketToOrderReducer,
    addAddress: addAddressReducer,
    applyVoucher: applyVoucherReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;