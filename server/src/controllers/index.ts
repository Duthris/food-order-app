import { getUsers, userRegister, userLogin, verifyUser, updateUser, 
    updateUserPassword, deleteUser, userForgotPassword, getUser,
    addAddress, deleteAddress, updateAddress, getAddress, getAddresses, 
    getVoucher, getVouchers, addRatingToRetaurantForCompletedOrder,
    getRatingsForRestaurant
} from './user.controller';
import { authUser } from './auth.user';
import {
    adminLogin, addAdmin, deleteAdmin, getAdmins, getAdmin, 
    verifyRestaurant, createCategory, deleteCategory, updateCategory, createVoucher, deleteVoucher, updateVoucher, createVoucherForAllUsers
} from './admin.controller';
import { restaurantRegister, restaurantLogin, 
    deleteRestaurant, getRestaurant, getRestaurantOrdersByRestaurant, updateRestaurant,
    createMenu, updateMenu, deleteMenu, createFood, updateFood, deleteFood,
    addFoodToMenu, getRestaurantMenusByRestaurant, removeFoodFromMenu, updateOrderStatus, getRestaurantOrder
} from './restaurant.controller';
import { getFood, getCategoryFoods, getRestaurantFoods } from './food.controller';
import { getMenu, getRestaurantMenus } from './menu.controller';
import { getCategories, getCategory } from './category.controller';
import { getOrders, getOrder, convertBasketToOrder, getOrdersByRestaurant 
} from './order.controller';
import { applyVoucherToBasket, getBasket, resetBasket, updateBasketWithSelectedFoods } from './basket.controller';

export { 
    // user operations
    getUsers, userRegister, authUser, userLogin, verifyUser, updateUser, updateUserPassword, 
    deleteUser, userForgotPassword, getUser, addAddress, deleteAddress, updateAddress, getAddress, getAddresses,
    getVoucher, getVouchers, addRatingToRetaurantForCompletedOrder, getRatingsForRestaurant,
    
    // admin operations
    adminLogin, addAdmin, deleteAdmin, getAdmins, getAdmin, verifyRestaurant, 
    createCategory, deleteCategory, updateCategory, createVoucher, deleteVoucher, updateVoucher, createVoucherForAllUsers,

    // restaurant operations
    restaurantRegister, restaurantLogin, deleteRestaurant, getRestaurant, 
    getRestaurantOrder, updateRestaurant, createMenu, updateMenu, deleteMenu,
    createFood, updateFood, deleteFood, addFoodToMenu, getRestaurantMenusByRestaurant, removeFoodFromMenu,
    updateOrderStatus,

    // food operations
    getFood, getCategoryFoods, getRestaurantFoods,

    // menu operations
    getMenu, getRestaurantMenus,

    // category operations
    getCategories, getCategory,

    // order operations
    getOrders, getOrder, convertBasketToOrder, getOrdersByRestaurant, getRestaurantOrdersByRestaurant, 

    // basket operations
    getBasket, resetBasket, updateBasketWithSelectedFoods, applyVoucherToBasket,
    };