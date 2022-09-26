import { Admin, Login, Restaurant, Register, Category, Menu, Voucher, 
    Basket, Order, AddFoodToBasket, RemoveFoodFromBasket, AddMenuFoodsToBasket, ResetBasket, Food,
    RemoveMenu, Address, BasketToOrder, AddAddress, ApplyVoucher, RemoveVoucher, AddRating
} from '../reducers/index';

export enum ActionType {
    GET_ADMINS_PENDING = 'GET_ADMIS_PENDING',
    GET_ADMINS_SUCCESS = 'GET_ADMIS_SUCCESS',
    GET_ADMINS_FAIL = 'GET_ADMIS_FAIL',
    LOGIN_PENDING = 'LOGIN_PENDING',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAIL = 'LOGIN_FAIL',
    GET_RESTAURANTS_PENDING = 'GET_RESTAURANTS_PENDING',
    GET_RESTAURANTS_SUCCESS = 'GET_RESTAURANTS_SUCCESS',
    GET_RESTAURANTS_FAIL = 'GET_RESTAURANTS_FAIL',
    REGISTER_PENDING = 'REGISTER_PENDING',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAIL = 'REGISTER_FAIL',
    GET_CATEGORIES_PENDING = 'GET_CATEGORIES_PENDING',
    GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS',
    GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL',
    GET_CATEGORY_RESTAURANT_PENDING = 'GET_CATEGORY_RESTAURANT_PENDING',
    GET_CATEGORY_RESTAURANT_SUCCESS = 'GET_CATEGORY_RESTAURANT_SUCCESS',
    GET_CATEGORY_RESTAURANT_FAIL = 'GET_CATEGORY_RESTAURANT_FAIL',
    GET_RESTAURANT_MENUS_PENDING = 'GET_RESTAURANT_MENUS_PENDING',
    GET_RESTAURANT_MENUS_SUCCESS = 'GET_RESTAURANT_MENUS_SUCCESS',
    GET_RESTAURANT_MENUS_FAIL = 'GET_RESTAURANT_MENUS_FAIL',
    GET_VOUCHERS_PENDING = 'GET_VOUCHERS_PENDING',
    GET_VOUCHERS_SUCCESS = 'GET_VOUCHERS_SUCCESS',
    GET_VOUCHERS_FAIL = 'GET_VOUCHERS_FAIL',
    GET_BASKET_PENDING = 'GET_BASKET_PENDING',
    GET_BASKET_SUCCESS = 'GET_BASKET_SUCCESS',
    GET_BASKET_FAIL = 'GET_BASKET_FAIL',
    GET_USER_ORDERS_PENDING = 'GET_USER_ORDERS_PENDING',
    GET_USER_ORDERS_SUCCESS = 'GET_USER_ORDERS_SUCCESS',
    GET_USER_ORDERS_FAIL = 'GET_USER_ORDERS_FAIL',
    ADD_FOOD_TO_BASKET_PENDING = 'ADD_FOOD_TO_BASKET_PENDING',
    ADD_FOOD_TO_BASKET_SUCCESS = 'ADD_FOOD_TO_BASKET_SUCCESS',
    ADD_FOOD_TO_BASKET_FAIL = 'ADD_FOOD_TO_BASKET_FAIL',
    REMOVE_FOOD_FROM_BASKET_PENDING = 'REMOVE_FOOD_FROM_BASKET_PENDING',
    REMOVE_FOOD_FROM_BASKET_SUCCESS = 'REMOVE_FOOD_FROM_BASKET_SUCCESS',
    REMOVE_FOOD_FROM_BASKET_FAIL = 'REMOVE_FOOD_FROM_BASKET_FAIL',
    ADD_MENU_FOODS_TO_BASKET_PENDING = 'ADD_MENU_FOODS_TO_BASKET_PENDING',
    ADD_MENU_FOODS_TO_BASKET_SUCCESS = 'ADD_MENU_FOODS_TO_BASKET_SUCCESS',
    ADD_MENU_FOODS_TO_BASKET_FAIL = 'ADD_MENU_FOODS_TO_BASKET_FAIL',
    RESET_BASKET_PENDING = 'RESET_BASKET_PENDING',
    RESET_BASKET_SUCCESS = 'RESET_BASKET_SUCCESS',
    RESET_BASKET_FAIL = 'RESET_BASKET_FAIL',
    REMOVE_MENU_FROM_BASKET_PENDING = 'REMOVE_MENU_FROM_BASKET_PENDING',
    REMOVE_MENU_FROM_BASKET_SUCCESS = 'REMOVE_MENU_FROM_BASKET_SUCCESS',
    REMOVE_MENU_FROM_BASKET_FAIL = 'REMOVE_MENU_FROM_BASKET_FAIL',
    GET_RESTAURANT_FOODS_PENDING = 'GET_RESTAURANT_FOODS_PENDING',
    GET_RESTAURANT_FOODS_SUCCESS = 'GET_RESTAURANT_FOODS_SUCCESS',
    GET_RESTAURANT_FOODS_FAIL = 'GET_RESTAURANT_FOODS_FAIL',
    GET_USER_ADDRESSES_PENDING = 'GET_USER_ADDRESSES_PENDING',
    GET_USER_ADDRESSES_SUCCESS = 'GET_USER_ADDRESSES_SUCCESS',
    GET_USER_ADDRESSES_FAIL = 'GET_USER_ADDRESSES_FAIL',
    CONVERT_BASKET_TO_ORDER_PENDING = 'CONVERT_BASKET_TO_ORDER_PENDING',
    CONVERT_BASKET_TO_ORDER_SUCCESS = 'CONVERT_BASKET_TO_ORDER_SUCCESS',
    CONVERT_BASKET_TO_ORDER_FAIL = 'CONVERT_BASKET_TO_ORDER_FAIL',
    ADD_ADDRESS_PENDING = 'ADD_ADDRESS_PENDING',
    ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS',
    ADD_ADDRESS_FAIL = 'ADD_ADDRESS_FAIL',
    APPLY_VOUCHER_PENDING = 'APPLY_VOUCHER_PENDING',
    APPLY_VOUCHER_SUCCESS = 'APPLY_VOUCHER_SUCCESS',
    APPLY_VOUCHER_FAIL = 'APPLY_VOUCHER_FAIL',
    REMOVE_VOUCHER_PENDING = 'REMOVE_VOUCHER_PENDING',
    REMOVE_VOUCHER_SUCCESS = 'REMOVE_VOUCHER_SUCCESS',
    REMOVE_VOUCHER_FAIL = 'REMOVE_VOUCHER_FAIL',
    ADD_RATING_PENDING = 'ADD_RATING_PENDING',
    ADD_RATING_SUCCESS = 'ADD_RATING_SUCCESS',
    ADD_RATING_FAIL = 'ADD_RATING_FAIL',
}

interface actionPending {
    type: ActionType.GET_ADMINS_PENDING;
}

interface actionSuccess {
    type: ActionType.GET_ADMINS_SUCCESS;
    payload: Admin[];
}

interface actionFail {
    type: ActionType.GET_ADMINS_FAIL;
    payload: string;
}

interface actionLoginPending {
    type: ActionType.LOGIN_PENDING;
}

interface actionLoginSuccess {
    type: ActionType.LOGIN_SUCCESS;
    payload: Login;
}

interface actionLoginFail {
    type: ActionType.LOGIN_FAIL;
    payload: string;
}

interface actionGetRestaurantsPending {
    type: ActionType.GET_RESTAURANTS_PENDING;
}

interface actionGetRestaurantsSuccess {
    type: ActionType.GET_RESTAURANTS_SUCCESS;
    payload: Restaurant[];
}

interface actionGetRestaurantsFail {
    type: ActionType.GET_RESTAURANTS_FAIL;
    payload: string;
}

interface actionRegisterPending {
    type: ActionType.REGISTER_PENDING;
}

interface actionRegisterSuccess {
    type: ActionType.REGISTER_SUCCESS;
    payload: Register;
}

interface actionRegisterFail {
    type: ActionType.REGISTER_FAIL;
    payload: string;
}

interface actionGetCategoriesPending {
    type: ActionType.GET_CATEGORIES_PENDING;
}

interface actionGetCategoriesSuccess {
    type: ActionType.GET_CATEGORIES_SUCCESS;
    payload: Category[];
}

interface actionGetCategoriesFail {
    type: ActionType.GET_CATEGORIES_FAIL;
    payload: string;
}

interface actionGetCategoryRestaurantPending {
    type: ActionType.GET_CATEGORY_RESTAURANT_PENDING;
}

interface actionGetCategoryRestaurantSuccess {
    type: ActionType.GET_CATEGORY_RESTAURANT_SUCCESS;
    payload: Restaurant[];
}

interface actionGetCategoryRestaurantFail {
    type: ActionType.GET_CATEGORY_RESTAURANT_FAIL;
    payload: string;
}

interface actionGetRestaurantMenusPending {
    type: ActionType.GET_RESTAURANT_MENUS_PENDING;
}

interface actionGetRestaurantMenusSuccess {
    type: ActionType.GET_RESTAURANT_MENUS_SUCCESS;
    payload: Menu[];
}

interface actionGetRestaurantMenusFail {
    type: ActionType.GET_RESTAURANT_MENUS_FAIL;
    payload: string;
}

interface actionGetVouchersPending {
    type: ActionType.GET_VOUCHERS_PENDING;
}

interface actionGetVouchersSuccess {
    type: ActionType.GET_VOUCHERS_SUCCESS;
    payload: Voucher[];
}

interface actionGetVouchersFail {
    type: ActionType.GET_VOUCHERS_FAIL;
    payload: string;
}

interface actionGetBasketPending {
    type: ActionType.GET_BASKET_PENDING;
}

interface actionGetBasketSuccess {
    type: ActionType.GET_BASKET_SUCCESS;
    payload: Basket;
}

interface actionGetBasketFail {
    type: ActionType.GET_BASKET_FAIL;
    payload: string;
}

interface actionGetUserOrdersPending {
    type: ActionType.GET_USER_ORDERS_PENDING;
}

interface actionGetUserOrdersSuccess {
    type: ActionType.GET_USER_ORDERS_SUCCESS;
    payload: Order[];
}

interface actionGetUserOrdersFail {
    type: ActionType.GET_USER_ORDERS_FAIL;
    payload: string;
}

interface actionAddFoodToBasketPending {
    type: ActionType.ADD_FOOD_TO_BASKET_PENDING;
}

interface actionAddFoodToBasketSuccess {
    type: ActionType.ADD_FOOD_TO_BASKET_SUCCESS;
    payload: AddFoodToBasket;
}

interface actionAddFoodToBasketFail {
    type: ActionType.ADD_FOOD_TO_BASKET_FAIL;
    payload: string;
}

interface actionRemoveFoodFromBasketPending {
    type: ActionType.REMOVE_FOOD_FROM_BASKET_PENDING;
}

interface actionRemoveFoodFromBasketSuccess {
    type: ActionType.REMOVE_FOOD_FROM_BASKET_SUCCESS;
    payload: RemoveFoodFromBasket;
}

interface actionRemoveFoodFromBasketFail {
    type: ActionType.REMOVE_FOOD_FROM_BASKET_FAIL;
    payload: string;
}

interface actionAddMenuFoodsToBasketPending {
    type: ActionType.ADD_MENU_FOODS_TO_BASKET_PENDING;
}

interface actionAddMenuFoodsToBasketSuccess {
    type: ActionType.ADD_MENU_FOODS_TO_BASKET_SUCCESS;
    payload: AddMenuFoodsToBasket;
}

interface actionAddMenuFoodsToBasketFail {
    type: ActionType.ADD_MENU_FOODS_TO_BASKET_FAIL;
    payload: string;
}

interface actionResetBasketPending {
    type: ActionType.RESET_BASKET_PENDING;
}

interface actionResetBasketSuccess {
    type: ActionType.RESET_BASKET_SUCCESS;
    payload: ResetBasket;
}

interface actionResetBasketFail {
    type: ActionType.RESET_BASKET_FAIL;
    payload: string;
}

interface actionRemoveMenuFromBasketPending {
    type: ActionType.REMOVE_MENU_FROM_BASKET_PENDING;
}

interface actionRemoveMenuFromBasketSuccess {
    type: ActionType.REMOVE_MENU_FROM_BASKET_SUCCESS;
    payload: RemoveMenu;
}

interface actionRemoveMenuFromBasketFail {
    type: ActionType.REMOVE_MENU_FROM_BASKET_FAIL;
    payload: string;
}

interface actionGetRestaurantFoodsPending {
    type: ActionType.GET_RESTAURANT_FOODS_PENDING;
}

interface actionGetRestaurantFoodsSuccess {
    type: ActionType.GET_RESTAURANT_FOODS_SUCCESS;
    payload: Food[];
}

interface actionGetRestaurantFoodsFail {
    type: ActionType.GET_RESTAURANT_FOODS_FAIL;
    payload: string;
}

interface actionGetUserAddressesPending {
    type: ActionType.GET_USER_ADDRESSES_PENDING;
}

interface actionGetUserAddressesSuccess {
    type: ActionType.GET_USER_ADDRESSES_SUCCESS;
    payload: Address[];
}

interface actionGetUserAddressesFail {
    type: ActionType.GET_USER_ADDRESSES_FAIL;
    payload: string;
}

interface actionConvertBasketToOrderPending {
    type: ActionType.CONVERT_BASKET_TO_ORDER_PENDING;
}

interface actionConvertBasketToOrderSuccess {
    type: ActionType.CONVERT_BASKET_TO_ORDER_SUCCESS;
    payload: BasketToOrder;
}

interface actionConvertBasketToOrderFail {
    type: ActionType.CONVERT_BASKET_TO_ORDER_FAIL;
    payload: string;
}

interface actionAddAddressPending {
    type: ActionType.ADD_ADDRESS_PENDING;
}

interface actionAddAddressSuccess {
    type: ActionType.ADD_ADDRESS_SUCCESS;
    payload: AddAddress;
}

interface actionAddAddressFail {
    type: ActionType.ADD_ADDRESS_FAIL;
    payload: string;
}

interface actionApplyVoucherPending {
    type: ActionType.APPLY_VOUCHER_PENDING;
}

interface actionApplyVoucherSuccess {
    type: ActionType.APPLY_VOUCHER_SUCCESS;
    payload: ApplyVoucher;
}

interface actionApplyVoucherFail {
    type: ActionType.APPLY_VOUCHER_FAIL;
    payload: string;
}

interface actionRemoveVoucherPending {
    type: ActionType.REMOVE_VOUCHER_PENDING;
}

interface actionRemoveVoucherSuccess {
    type: ActionType.REMOVE_VOUCHER_SUCCESS;
    payload: RemoveVoucher;
}

interface actionRemoveVoucherFail {
    type: ActionType.REMOVE_VOUCHER_FAIL;
    payload: string;
}

interface actionAddRatingPending {
    type: ActionType.ADD_RATING_PENDING;
}

interface actionAddRatingSuccess {
    type: ActionType.ADD_RATING_SUCCESS;
    payload: AddRating;
}

interface actionAddRatingFail {
    type: ActionType.ADD_RATING_FAIL;
    payload: string;
}


export type Action = actionPending | actionSuccess | actionFail | 
                    actionLoginPending | actionLoginSuccess | actionLoginFail |
                    actionGetRestaurantsPending | actionGetRestaurantsSuccess | actionGetRestaurantsFail |
                    actionRegisterPending | actionRegisterSuccess | actionRegisterFail |
                    actionGetCategoriesPending | actionGetCategoriesSuccess | actionGetCategoriesFail |
                    actionGetCategoryRestaurantPending | actionGetCategoryRestaurantSuccess | actionGetCategoryRestaurantFail |
                    actionGetRestaurantMenusPending | actionGetRestaurantMenusSuccess | actionGetRestaurantMenusFail |
                    actionGetVouchersPending | actionGetVouchersSuccess | actionGetVouchersFail |
                    actionGetBasketPending | actionGetBasketSuccess | actionGetBasketFail |
                    actionGetUserOrdersPending | actionGetUserOrdersSuccess | actionGetUserOrdersFail |
                    actionAddFoodToBasketPending | actionAddFoodToBasketSuccess | actionAddFoodToBasketFail |
                    actionRemoveFoodFromBasketPending | actionRemoveFoodFromBasketSuccess | actionRemoveFoodFromBasketFail |
                    actionAddMenuFoodsToBasketPending | actionAddMenuFoodsToBasketSuccess | actionAddMenuFoodsToBasketFail |
                    actionResetBasketPending | actionResetBasketSuccess | actionResetBasketFail |
                    actionRemoveMenuFromBasketPending | actionRemoveMenuFromBasketSuccess | actionRemoveMenuFromBasketFail |
                    actionGetRestaurantFoodsPending | actionGetRestaurantFoodsSuccess | actionGetRestaurantFoodsFail |
                    actionGetUserAddressesPending | actionGetUserAddressesSuccess | actionGetUserAddressesFail |
                    actionConvertBasketToOrderPending | actionConvertBasketToOrderSuccess | actionConvertBasketToOrderFail |
                    actionAddAddressPending | actionAddAddressSuccess | actionAddAddressFail |
                    actionApplyVoucherPending | actionApplyVoucherSuccess | actionApplyVoucherFail |
                    actionRemoveVoucherPending | actionRemoveVoucherSuccess | actionRemoveVoucherFail |
                    actionAddRatingPending | actionAddRatingSuccess | actionAddRatingFail;