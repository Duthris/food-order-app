import { Action, ActionType } from '../actionTypes/index';

export interface Admin {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface State {
    loading: boolean;
    admins: Admin[];
    error: string | null;
}

const initialState: State = {
    loading: false,
    admins: [],
    error: null,
};

export interface Login {
    email: string;
    id: number;
    token: string;
}


interface LoginState {
    loading: boolean;
    auth: Login
    error: string | null;
}

const initialStateAdminLogin: LoginState = {
    loading: false,
    auth: {
        email: '',
        id: 0,
        token: '',
    },
    error: null,
};

export interface Restaurant {
    id: number;
    name: string;
    address: string;
    photo: string;
    phone: string;
    Foods: Food[];
}

export interface Food {
    id: number;
    name: string;
    price: number;
    photo: string;
    description: string;
    RestaurantId: number;
    menuId: number;
    stock: number;
    categoryId: number;
}

interface CategoryRestaurantState {
    loading: boolean;
    restaurants: Restaurant[];
    error: string | null;
}

const initialStateCategoryRestaurant: CategoryRestaurantState = {
    loading: false,
    restaurants: [],
    error: null,
};

interface RestaurantState {
    loading: boolean;
    restaurants: Restaurant[];
    error: string | null;
}

const initialStateRestaurants: RestaurantState = {
    loading: false,
    restaurants: [],
    error: null,
};

export interface Register {
    email: string;
    id: number;
    token: string;
}

interface RegisterState {
    loading: boolean;
    auth: Register
    error: string | null;
}

const initialStateRegister: RegisterState = {
    loading: false,
    auth: {
        email: '',
        id: 0,
        token: '',
    },
    error: null,
};


export interface Category {
    id: number;
    name: string;
    Foods: Food[];
}

interface CategoryState {
    loading: boolean;
    categories: Category[];
    error: string | null;
}

const initialStateCategories: CategoryState = {
    loading: false,
    categories: [],
    error: null,
};

export interface Menu {
    id: number;
    name: string;
    Foods: Food[];
}

interface MenuState {
    loading: boolean;
    menus: Menu[];
    error: string | null;
}

const initialStateMenus: MenuState = {
    loading: false,
    menus: [],
    error: null,
};

export interface Voucher {
    id: number;
    name: string;
    code: string;
    discount: number;
    active: boolean;
    createdAt: Date;
    expiredAt: Date;
    updatedAt: Date;
    description: string;
    minAmount: number;
    userId: number;
}

interface VoucherState {
    loading: boolean;
    vouchers: Voucher[];
    error: string | null;
}

const initialStateVouchers: VoucherState = {
    loading: false,
    vouchers: [],
    error: null,
};

export interface Basket {
    id: number;
    amount: number;
    userId: number;
    Foods: Food[];
}

interface BasketState {
    loading: boolean;
    basket: Basket;
    error: string | null;
}

const initialStateBaskets: BasketState = {
    loading: false,
    basket: {
        id: 0,
        amount: 0,
        userId: 0,
        Foods: [],
    },
    error: null,
};

export interface Order {
    id: number;
    amount: number;
    userId: number;
    restaurantId: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    Foods: Food[];
    Restaurant: Restaurant;
}

interface OrderState {
    loading: boolean;
    orders: Order[];
    error: string | null;
}

const initialStateOrders: OrderState = {
    loading: false,
    orders: [],
    error: null,
};

export interface AddFoodToBasket {
    userId: number;
    foodId: number;
}

interface AddFoodToBasketState {
    loading: boolean;
    addFoodToBasket: AddFoodToBasket;
    error: string | null;
}

const initialStateAddFoodToBasket: AddFoodToBasketState = {
    loading: false,
    addFoodToBasket: {
        userId: 0,
        foodId: 0,
    },
    error: null,
};

export interface RemoveFoodFromBasket {
    userId: number;
    foodId: number;
}

interface RemoveFoodFromBasketState {
    loading: boolean;
    removeFoodFromBasket: RemoveFoodFromBasket;
    error: string | null;
}

const initialStateRemoveFoodFromBasket: RemoveFoodFromBasketState = {
    loading: false,
    removeFoodFromBasket: {
        userId: 0,
        foodId: 0,
    },
    error: null,
};

export interface AddMenuFoodsToBasket {
    userId: number;
    menuId: number;
}

interface AddMenuFoodsToBasketState {
    loading: boolean;
    addMenuFoodsToBasket: AddMenuFoodsToBasket;
    error: string | null;
}

const initialStateAddMenuFoodsToBasket: AddMenuFoodsToBasketState = {
    loading: false,
    addMenuFoodsToBasket: {
        userId: 0,
        menuId: 0,
    },
    error: null,
};

export interface ResetBasket {
    userId: number;
}

interface ResetBasketState {
    loading: boolean;
    resetBasket: ResetBasket;
    error: string | null;
}

const initialStateResetBasket: ResetBasketState = {
    loading: false,
    resetBasket: {
        userId: 0,
    },
    error: null,
};

export interface RemoveMenu {
    userId: number;
    menuId: number;
}

interface RemoveMenuState {
    loading: boolean;
    removeMenu: RemoveMenu;
    error: string | null;
}

const initialStateRemoveMenu: RemoveMenuState = {
    loading: false,
    removeMenu: {
        userId: 0,
        menuId: 0,
    },
    error: null,
};

interface RestaurantFoodsState {
    loading: boolean;
    restaurantFoods: Food[];
    error: string | null;
}

const initialStateRestaurantFoods: RestaurantFoodsState = {
    loading: false,
    restaurantFoods: [],
    error: null,
};

export interface Address {
    id: number;
    address: string;
    city: string;
    country: string;
    zip: string;
    userId: number;
}

interface AddressState {
    loading: boolean;
    addresses: Address[];
    error: string | null;
}

const initialStateAddresses: AddressState = {
    loading: false,
    addresses: [],
    error: null,
};

export interface BasketToOrder {
    userId: number;
    addressId: number;
}

interface BasketToOrderState {
    loading: boolean;
    basketToOrder: BasketToOrder;
    error: string | null;
}

const initialStateBasketToOrder: BasketToOrderState = {
    loading: false,
    basketToOrder: {
        userId: 0,
        addressId: 0,
    },
    error: null,
};

export interface AddAddress {
    address: string;
    city: string;
    country: string;
    zip: string;
    userId: number;
    state: string;
    name: string;
}

interface AddAddressState {
    loading: boolean;
    addAddress: AddAddress;
    error: string | null;
}

const initialStateAddAddress: AddAddressState = {
    loading: false,
    addAddress: {
        address: '',
        city: '',
        country: '',
        zip: '',
        userId: 0,
        state: '',
        name: '',
    },
    error: null,
};

export interface ApplyVoucher {
    userId: number;
    coupon: string;
}

interface ApplyVoucherState {
    loading: boolean;
    applyVoucher: ApplyVoucher;
    error: string | null;
}

const initialStateApplyVoucher: ApplyVoucherState = {
    loading: false,
    applyVoucher: {
        userId: 0,
        coupon: '',
    },
    error: null,
};

export interface RemoveVoucher {
    userId: number;
}

interface RemoveVoucherState {
    loading: boolean;
    removeVoucher: RemoveVoucher;
    error: string | null;
}

const initialStateRemoveVoucher: RemoveVoucherState = {
    loading: false,
    removeVoucher: {
        userId: 0,
    },
    error: null,
};

export const adminReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.GET_ADMINS_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.GET_ADMINS_SUCCESS:
            console.log(action.payload, 'action.payload');
        return {
                loading: false,
                admins: action.payload,
                error: null,
            };
        case ActionType.GET_ADMINS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const loginReducer = (state: LoginState = initialStateAdminLogin, action: Action): LoginState => {
    switch (action.type) {
        case ActionType.LOGIN_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.LOGIN_SUCCESS:
            return {
                loading: false,
                auth: action.payload,
                error: null,
            };
        case ActionType.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const restaurantReducer = (state: RestaurantState = initialStateRestaurants, action: Action): RestaurantState => {
    switch (action.type) {
        case ActionType.GET_RESTAURANTS_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.GET_RESTAURANTS_SUCCESS:
            return {
                loading: false,
                restaurants: action.payload,
                error: null,
            };
        case ActionType.GET_RESTAURANTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const registerReducer = (state: RegisterState = initialStateRegister, action: Action): RegisterState => {
    switch (action.type) {
        case ActionType.REGISTER_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.REGISTER_SUCCESS:
            return {
                loading: false,
                auth: action.payload,
                error: null,
            };
        case ActionType.REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const categoryReducer = (state: CategoryState = initialStateCategories, action: Action): CategoryState => {
    switch (action.type) {
        case ActionType.GET_CATEGORIES_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.GET_CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload,
                error: null,
            };
        case ActionType.GET_CATEGORIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const categoryRestaurantReducer = (state: CategoryRestaurantState = initialStateCategoryRestaurant, action: Action): CategoryRestaurantState => {
    switch (action.type) {
        case ActionType.GET_CATEGORY_RESTAURANT_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.GET_CATEGORY_RESTAURANT_SUCCESS:
            return {
                loading: false,
                restaurants: action.payload,
                error: null,
            };
        case ActionType.GET_CATEGORY_RESTAURANT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const menuReducer = (state: MenuState = initialStateMenus, action: Action): MenuState => {
    switch (action.type) {
        case ActionType.GET_RESTAURANT_MENUS_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.GET_RESTAURANT_MENUS_SUCCESS:
            return {
                loading: false,
                menus: action.payload,
                error: null,
            };
        case ActionType.GET_RESTAURANT_MENUS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const voucherReducer = (state: VoucherState = initialStateVouchers, action: Action): VoucherState => {
    switch (action.type) {
        case ActionType.GET_VOUCHERS_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.GET_VOUCHERS_SUCCESS:
            return {
                loading: false,
                vouchers: action.payload,
                error: null,
            };
        case ActionType.GET_VOUCHERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const basketReducer = (state: BasketState = initialStateBaskets, action: Action): BasketState => {
    switch (action.type) {
        case ActionType.GET_BASKET_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.GET_BASKET_SUCCESS:
            return {
                loading: false,
                basket: action.payload,
                error: null,
            };
        case ActionType.GET_BASKET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const orderReducer = (state: OrderState = initialStateOrders, action: Action): OrderState => {
    switch (action.type) {
        case ActionType.GET_USER_ORDERS_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.GET_USER_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
                error: null,
            };
        case ActionType.GET_USER_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const addFoodToBasketReducer = (state: AddFoodToBasketState = initialStateAddFoodToBasket, action: Action): AddFoodToBasketState => {
    switch (action.type) {
        case ActionType.ADD_FOOD_TO_BASKET_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.ADD_FOOD_TO_BASKET_SUCCESS:
            return {
                loading: false,
                addFoodToBasket: action.payload,
                error: null,
            };
        case ActionType.ADD_FOOD_TO_BASKET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const removeFoodFromBasketReducer = (state: RemoveFoodFromBasketState = initialStateRemoveFoodFromBasket, action: Action): RemoveFoodFromBasketState => {
    switch (action.type) {
        case ActionType.REMOVE_FOOD_FROM_BASKET_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.REMOVE_FOOD_FROM_BASKET_SUCCESS:
            return {
                loading: false,
                removeFoodFromBasket: action.payload,
                error: null,
            };
        case ActionType.REMOVE_FOOD_FROM_BASKET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const addMenuFoodsToBasketReducer = (state: AddMenuFoodsToBasketState = initialStateAddMenuFoodsToBasket, action: Action): AddMenuFoodsToBasketState => {
    switch (action.type) {
        case ActionType.ADD_MENU_FOODS_TO_BASKET_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.ADD_MENU_FOODS_TO_BASKET_SUCCESS:
            return {
                loading: false,
                addMenuFoodsToBasket: action.payload,
                error: null,
            };
        case ActionType.ADD_MENU_FOODS_TO_BASKET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const resetBasketReducer = (state: ResetBasketState = initialStateResetBasket, action: Action): ResetBasketState => {
    switch (action.type) {
        case ActionType.RESET_BASKET_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.RESET_BASKET_SUCCESS:
            return {
                loading: false,
                resetBasket: action.payload,
                error: null,
            };
        case ActionType.RESET_BASKET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const removeMenuFromBasketReducer = (state: RemoveMenuState = initialStateRemoveMenu, action: Action): RemoveMenuState => {
    switch (action.type) {
        case ActionType.REMOVE_MENU_FROM_BASKET_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.REMOVE_MENU_FROM_BASKET_SUCCESS:
            return {
                loading: false,
                removeMenu: action.payload,
                error: null,
            };
        case ActionType.REMOVE_MENU_FROM_BASKET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const getRestaurantFoodsReducer = (state: RestaurantFoodsState = initialStateRestaurantFoods, action: Action): RestaurantFoodsState => {
    switch (action.type) {
        case ActionType.GET_RESTAURANT_FOODS_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.GET_RESTAURANT_FOODS_SUCCESS:
            return {
                loading: false,
                restaurantFoods: action.payload,
                error: null,
            };
        case ActionType.GET_RESTAURANT_FOODS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const getUserAddressesReducer = (state: AddressState = initialStateAddresses, action: Action): AddressState => {
    switch (action.type) {
        case ActionType.GET_USER_ADDRESSES_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.GET_USER_ADDRESSES_SUCCESS:
            return {
                loading: false,
                addresses: action.payload,
                error: null,
            };
        case ActionType.GET_USER_ADDRESSES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const convertBasketToOrderReducer = (state: BasketToOrderState = initialStateBasketToOrder, action: Action): BasketToOrderState => {
    switch (action.type) {
        case ActionType.CONVERT_BASKET_TO_ORDER_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.CONVERT_BASKET_TO_ORDER_SUCCESS:
            return {
                loading: false,
                basketToOrder: action.payload,
                error: null,
            };
        case ActionType.CONVERT_BASKET_TO_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const addAddressReducer = (state: AddAddressState = initialStateAddAddress, action: Action): AddAddressState => {
    switch (action.type) {
        case ActionType.ADD_ADDRESS_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.ADD_ADDRESS_SUCCESS:
            return {
                loading: false,
                addAddress: action.payload,
                error: null,
            };
        case ActionType.ADD_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const applyVoucherReducer = (state: ApplyVoucherState = initialStateApplyVoucher, action: Action): ApplyVoucherState => {
    switch (action.type) {
        case ActionType.APPLY_VOUCHER_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.APPLY_VOUCHER_SUCCESS:
            return {
                loading: false,
                applyVoucher: action.payload,
                error: null,
            };
        case ActionType.APPLY_VOUCHER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const removeVoucherReducer = (state: RemoveVoucherState = initialStateRemoveVoucher, action: Action): RemoveVoucherState => {
    switch (action.type) {
        case ActionType.REMOVE_VOUCHER_PENDING:
            return {
                ...state,
                loading: true,
            };
        case ActionType.REMOVE_VOUCHER_SUCCESS:
            return {
                loading: false,
                removeVoucher: action.payload,
                error: null,
            };
        case ActionType.REMOVE_VOUCHER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
