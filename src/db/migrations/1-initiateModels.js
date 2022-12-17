'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Admins", deps: []
 * createTable "Disputes", deps: []
 * createTable "Inventories", deps: []
 * createTable "Merchants", deps: []
 * createTable "OneTimePasswords", deps: []
 * createTable "Orders", deps: []
 * createTable "OrderedItems", deps: []
 * createTable "Payouts", deps: []
 * createTable "Categories", deps: []
 * createTable "Products", deps: []
 * createTable "Reviews", deps: []
 * createTable "Trackers", deps: []
 * createTable "Transactions", deps: []
 * createTable "Users", deps: []
 * createTable "Withdrawals", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initiateModels",
    "created": "2022-10-24T16:00:16.928Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Admins",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "fullName": {
                    "type": Sequelize.STRING,
                    "field": "fullName"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "allowNull": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "role": {
                    "type": Sequelize.ENUM('super', 'admin'),
                    "field": "role",
                    "defaultValue": "admin"
                },
                "isBlocked": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isBlocked",
                    "defaultValue": false
                },
                "refreshTokens": {
                    "type": Sequelize.STRING,
                    "field": "refreshTokens"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Disputes",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "product_image": {
                    "type": Sequelize.STRING,
                    "field": "product_image"
                },
                "reason": {
                    "type": Sequelize.ENUM('Wrong Order', 'Lost Order', 'Damaged Product', 'Fake Product'),
                    "field": "reason"
                },
                "status": {
                    "type": Sequelize.ENUM('Initiated', 'Resolved'),
                    "field": "status",
                    "defaultValue": "Initiated"
                },
                "awarded_to": {
                    "type": Sequelize.ENUM('customer', 'seller', 'inView'),
                    "field": "awarded_to",
                    "defaultValue": "inView"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Inventories",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "picture": {
                    "type": Sequelize.STRING,
                    "field": "picture"
                },
                "picture_2": {
                    "type": Sequelize.STRING,
                    "field": "picture_2"
                },
                "picture_3": {
                    "type": Sequelize.STRING,
                    "field": "picture_3"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "quantity_available": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity_available",
                    "defaultValue": 1
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price"
                },
                "isapproved": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isapproved",
                    "defaultValue": false
                },
                "ratings": {
                    "type": Sequelize.INTEGER,
                    "field": "ratings"
                },
                "status": {
                    "type": Sequelize.ENUM('available', 'out of stock'),
                    "field": "status",
                    "defaultValue": "available"
                },
                "inventory_owner": {
                    "type": Sequelize.STRING,
                    "field": "inventory_owner"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Merchants",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "business_name": {
                    "type": Sequelize.STRING,
                    "field": "business_name"
                },
                "business_type": {
                    "type": Sequelize.ENUM('public limited company', 'private limited company'),
                    "field": "business_type",
                    "defaultValue": "public limited company"
                },
                "business_description": {
                    "type": Sequelize.STRING,
                    "field": "business_description"
                },
                "bank_name": {
                    "type": Sequelize.STRING,
                    "field": "bank_name"
                },
                "account_name": {
                    "type": Sequelize.STRING,
                    "field": "account_name"
                },
                "account_number": {
                    "type": Sequelize.STRING,
                    "field": "account_number"
                },
                "bank_verification_number": {
                    "type": Sequelize.INTEGER,
                    "field": "bank_verification_number"
                },
                "cac_document": {
                    "type": Sequelize.STRING,
                    "field": "cac_document"
                },
                "tax_id_number": {
                    "type": Sequelize.INTEGER,
                    "field": "tax_id_number"
                },
                "brand_image": {
                    "type": Sequelize.STRING,
                    "field": "brand_image"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "allowNull": true
                },
                "isVerified": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isVerified",
                    "defaultValue": false
                },
                "isBlocked": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isBlocked",
                    "defaultValue": false
                },
                "refreshTokens": {
                    "type": Sequelize.STRING,
                    "field": "refreshTokens"
                },
                "ratings": {
                    "type": Sequelize.INTEGER,
                    "field": "ratings"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "OneTimePasswords",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "otp": {
                    "type": Sequelize.STRING,
                    "field": "otp"
                },
                "signedToken": {
                    "type": Sequelize.STRING,
                    "field": "signedToken"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Orders",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "items": {
                    "type": Sequelize.STRING,
                    "field": "items"
                },
                "isPaid": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isPaid",
                    "defaultValue": false
                },
                "payment_type": {
                    "type": Sequelize.ENUM('pay-now', 'on-delivery'),
                    "field": "payment_type",
                    "defaultValue": "on-delivery"
                },
                "order_cost": {
                    "type": Sequelize.INTEGER,
                    "field": "order_cost",
                    "defaultValue": 0
                },
                "delivery_type": {
                    "type": Sequelize.ENUM('door_delivery', 'pickup_station'),
                    "field": "delivery_type",
                    "defaultValue": "door_delivery"
                },
                "delivery_address": {
                    "type": Sequelize.STRING,
                    "field": "delivery_address",
                    "allowNull": false
                },
                "delivery_date": {
                    "type": Sequelize.DATE,
                    "field": "delivery_date"
                },
                "customer_contact": {
                    "type": Sequelize.STRING,
                    "field": "customer_contact"
                },
                "status": {
                    "type": Sequelize.ENUM('canceled', 'active', 'delivered', 'disputed'),
                    "field": "status",
                    "defaultValue": "active"
                },
                "trackingId": {
                    "type": Sequelize.STRING,
                    "field": "trackingId"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "OrderedItems",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "product_name": {
                    "type": Sequelize.STRING,
                    "field": "product_name",
                    "allowNull": false
                },
                "picture": {
                    "type": Sequelize.STRING,
                    "field": "picture"
                },
                "picture_2": {
                    "type": Sequelize.STRING,
                    "field": "picture_2"
                },
                "picture_3": {
                    "type": Sequelize.STRING,
                    "field": "picture_3"
                },
                "quantity_ordered": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity_ordered",
                    "defaultValue": 1
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price",
                    "defaultValue": false
                },
                "total": {
                    "type": Sequelize.INTEGER,
                    "field": "total",
                    "defaultValue": false
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "resale": {
                    "type": Sequelize.BOOLEAN,
                    "field": "resale",
                    "defaultValue": false
                },
                "resale_profit": {
                    "type": Sequelize.INTEGER,
                    "field": "resale_profit"
                },
                "profit_owner": {
                    "type": Sequelize.STRING,
                    "field": "profit_owner"
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Payouts",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "amount": {
                    "type": Sequelize.INTEGER,
                    "field": "amount"
                },
                "payable_amount": {
                    "type": Sequelize.INTEGER,
                    "field": "payable_amount"
                },
                "debit_currency": {
                    "type": Sequelize.STRING,
                    "field": "debit_currency",
                    "defaultValue": "NGN"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number"
                },
                "tax": {
                    "type": Sequelize.INTEGER,
                    "field": "tax"
                },
                "status": {
                    "type": Sequelize.ENUM('NEW', 'SUCCESSFUL', 'FAILED'),
                    "field": "status",
                    "defaultValue": "NEW"
                },
                "narration": {
                    "type": Sequelize.STRING,
                    "field": "narration"
                },
                "date_initiated": {
                    "type": Sequelize.DATE,
                    "field": "date_initiated"
                },
                "date_paid": {
                    "type": Sequelize.DATE,
                    "field": "date_paid"
                },
                "beneficiary_account_bank": {
                    "type": Sequelize.STRING,
                    "field": "beneficiary_account_bank"
                },
                "beneficiary_account_name": {
                    "type": Sequelize.STRING,
                    "field": "beneficiary_account_name"
                },
                "beneficiary_account_number": {
                    "type": Sequelize.STRING,
                    "field": "beneficiary_account_number"
                },
                "payment_ref": {
                    "type": Sequelize.STRING,
                    "field": "payment_ref"
                },
                "flw_transfer_id": {
                    "type": Sequelize.INTEGER,
                    "field": "flw_transfer_id"
                },
                "remarks": {
                    "type": Sequelize.STRING,
                    "field": "remarks"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Categories",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "created_by": {
                    "type": Sequelize.STRING,
                    "field": "created_by"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Products",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "picture": {
                    "type": Sequelize.STRING,
                    "field": "picture"
                },
                "picture_2": {
                    "type": Sequelize.STRING,
                    "field": "picture_2"
                },
                "picture_3": {
                    "type": Sequelize.STRING,
                    "field": "picture_3"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "quantity_available": {
                    "type": Sequelize.INTEGER,
                    "field": "quantity_available",
                    "defaultValue": 1
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price"
                },
                "isapproved": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isapproved",
                    "defaultValue": true
                },
                "ratings": {
                    "type": Sequelize.INTEGER,
                    "field": "ratings"
                },
                "status": {
                    "type": Sequelize.ENUM('available', 'out of stock'),
                    "field": "status",
                    "defaultValue": "available"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Reviews",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "text": {
                    "type": Sequelize.STRING,
                    "field": "text"
                },
                "rating": {
                    "type": Sequelize.INTEGER,
                    "field": "rating",
                    "defaultValue": 3
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Trackers",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "status": {
                    "type": Sequelize.ENUM('order_placed', 'order_in_progress', 'order_shipped', 'order_out_for_delivery', 'order_id_delivered'),
                    "field": "status",
                    "defaultValue": "order_placed"
                },
                "trackingId": {
                    "type": Sequelize.STRING,
                    "field": "trackingId"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Transactions",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "tx_ref": {
                    "type": Sequelize.STRING,
                    "field": "tx_ref"
                },
                "amount": {
                    "type": Sequelize.INTEGER,
                    "field": "amount"
                },
                "currency": {
                    "type": Sequelize.STRING,
                    "field": "currency",
                    "defaultValue": "NGN"
                },
                "order_id": {
                    "type": Sequelize.STRING,
                    "field": "order_id"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "type": {
                    "type": Sequelize.ENUM('inbound', 'outbound'),
                    "field": "type"
                },
                "status": {
                    "type": Sequelize.ENUM('pending', 'successful', 'failed', 'cancelled'),
                    "field": "status",
                    "defaultValue": "pending"
                },
                "flw_transaction_id": {
                    "type": Sequelize.STRING,
                    "field": "flw_transaction_id"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "fullName": {
                    "type": Sequelize.STRING,
                    "field": "fullName"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "allowNull": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "isVerified": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isVerified",
                    "defaultValue": false
                },
                "isBlocked": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isBlocked",
                    "defaultValue": false
                },
                "refreshTokens": {
                    "type": Sequelize.STRING,
                    "field": "refreshTokens"
                },
                "delivery_address": {
                    "type": Sequelize.STRING,
                    "field": "delivery_address"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Withdrawals",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "tx_ref": {
                    "type": Sequelize.STRING,
                    "field": "tx_ref"
                },
                "amount": {
                    "type": Sequelize.INTEGER,
                    "field": "amount"
                },
                "currency": {
                    "type": Sequelize.STRING,
                    "field": "currency",
                    "defaultValue": "NGN"
                },
                "order_id": {
                    "type": Sequelize.STRING,
                    "field": "order_id"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "status": {
                    "type": Sequelize.ENUM('pending', 'successful', 'failed', 'approved'),
                    "field": "status",
                    "defaultValue": "pending"
                },
                "tax": {
                    "type": Sequelize.INTEGER,
                    "field": "tax"
                },
                "resale": {
                    "type": Sequelize.BOOLEAN,
                    "field": "resale",
                    "defaultValue": false
                },
                "due_date": {
                    "type": Sequelize.DATE,
                    "field": "due_date",
                    "defaultValue": Sequelize.Date
                },
                "date_paid": {
                    "type": Sequelize.DATE,
                    "field": "date_paid"
                },
                "payment_ref": {
                    "type": Sequelize.STRING,
                    "field": "payment_ref",
                    "defaultValue": ""
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
