// @ts-nocheck
sap.ui.define([
		"sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/m/MessageToast"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     * @param {typeof sap.m.MessageToast} MessageToast
     * 
     */
	function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
		"use strict";

		return Controller.extend("logaligroup.Employees.controller.MainView", {
			onInit: function () {
                
                var oView = this.getView();

                var oJsonModelEmployees = new JSONModel();
                oJsonModelEmployees.loadData("./localService/mockdata/Employees.json", false);
                oView.setModel(oJsonModelEmployees, "JsonEmployees");

                var oJsonModelCountries = new JSONModel();
                oJsonModelCountries.loadData("./localService/mockdata/Countries.json", false)
                oView.setModel(oJsonModelCountries, "JsonCountries");

                var oJsonModelConfig = new JSONModel({
                    visibleID : true,
                    visibleName : true,
                    visibleCountry : true,
                    visibleCity : false,
                    visibleBtnShowCity : true,
                    visibleBtnHideCity : false

                });

                oView.setModel(oJsonModelConfig,"JsonConfig");

			},

            onFilter: function(){
                var oJSONCountries = this.getView().getModel("JsonCountries").getData();
                var filters = [];

                if(oJSONCountries.EmployeeIdgeneral !== ""){
                    filters.push(new Filter("EmployeeID",FilterOperator.EQ, oJSONCountries.EmployeeIdgeneral))

                }
                if(oJSONCountries.CountryKey !== ""){
                    filters.push(new Filter("Country",FilterOperator.EQ, oJSONCountries.CountryKey))

                }

                var oList = this.getView().byId("tableEmployee");
                var oBinding = oList.getBinding("items");
                oBinding.filter(filters);
            },


            onClearFilter: function(){
                var oModel= this.getView().getModel("JsonCountries");
                oModel.setProperty("/EmployeeIdgeneral", "");
                oModel.setProperty("/CountryKey", "");
               
            },

            onShowPostalCode: function (oEvent){
                var itemPressed = oEvent.getSource();
                var oContext = itemPressed.getBindingContext("JsonEmployees");
                var ObjectContext = oContext.getObject();

                MessageToast.show(ObjectContext.PostalCode);

            },
            ShowCity: function (){
                var oModel= this.getView().getModel("JsonConfig");
                oModel.setProperty("/visibleCity", true);
                oModel.setProperty("/visibleBtnShowCity", false);
                oModel.setProperty("/visibleBtnHideCity", true);

            },
            HideCity : function (){
                var oModel= this.getView().getModel("JsonConfig");
                oModel.setProperty("/visibleCity", false);
                oModel.setProperty("/visibleBtnShowCity", true);
                oModel.setProperty("/visibleBtnHideCity", false);

            },

            ShowOrders : function (oEvent){
                var iconPressed = oEvent.getSource();
                var oContext = iconPressed.getBindingContext("JsonEmployees");

                if(!this._oDialogOrders){
                this._oDialogOrders = sap.ui.xmlfragment("logaligroup.Employees.fragment.DialogOrders", this);
                this.getView().addDependent(this._oDialogOrders);
                };

                this._oDialogOrders.bindElement("JsonEmployees>" + oContext.getPath())
                this._oDialogOrders.open();

            },

            onCloseOrders:function(){
                this._oDialogOrders.close();
            }
            // chequeaba que la longitud de los caracteres 
            // en el elemento imput fueran de al menos 6 caracteres
            // onValidate: function(){
            //     var inputEmployee= this.byId("imputEmployee");
            //     var valueEmployee = inputEmployee.getValue();
            //     var varSelectionLabel = this.byId("labelCountry");
            //     var varSelection = this.byId("slCountry");
            //     if (valueEmployee.length === 6){
            //         //varSelectionLabel.Tog
            //         varSelectionLabel.setVisible(true);
            //         varSelection.setVisible(true);
            //     }else {
            //        // inputEmployee.setDescription("Not Ok");
            //        varSelectionLabel.setVisible(false);
            //        varSelection.setVisible(false);
            //     }
            // }
		});
	});

 //var i18Bundle = oView.getModel("i18n").getResourceBundle();

                // var oJSON = {
                //     employeeId : "12345",
                //     countryKey: "UK",
                //     listCountry: [
                //         {
                //             key:"US",
                //             text: i18Bundle.getText("CountryUS")
                //         },

                //         {
                //             key:"UK",
                //             text: i18Bundle.getText("CountryUK")

                //         },

                //         {

                //             key:"ES",
                //             text: i18Bundle.getText("CountryES")

                //         },
                //         {

                //             key:"PT",
                //             text: i18Bundle.getText("CountryPT")

                //         }
                //     ]

                // };

                // oJsonModel.setData(oJSON);

                /*  var ordersTable = this.getView().byId("OrdersTable");
                ordersTable.destroyItems();

                var itemPressed = oEvent.getSource();
                var oContext = itemPressed.getBindingContext("JsonEmployees");
                var ObjectContext = oContext.getObject();
                var orders = ObjectContext.Orders;
                var ordersItems = [];

                for (var i in orders){
                    ordersItems.push(new sap.m.ColumnListItem({
                        cells : [
                            new sap.m.Label({text: orders[i].OrderID}),
                            new sap.m.Label({text: orders[i].Freight}),
                            new sap.m.Label({text: orders[i].ShipAddress})
                        ]
                    }));
                }
                var newTable= new sap.m.Table({
                    width : "auto",
                    columns: [
                        new sap.m.Column ({header : new sap.m.Label({text : "{i18n>orderID}"})}),
                        new sap.m.Column ({header : new sap.m.Label({text : "{i18n>freight}"})}),
                        new sap.m.Column ({header : new sap.m.Label({text : "{i18n>shipAddress}"})})
                    ],
                    items : ordersItems
                }).addStyleClass("sapUiSmallMarginEnd");
                ordersTable.addItem(newTable);

                var newTableJson = new sap.m.Table();
                newTableJson.addStyleClass("sapUiSmallMargin");
                newTableJson.setWidth("auto");

                var columnOrderID = new sap.m.Column();
                var labelOrderID = new sap.m.Label();
                labelOrderID.bindProperty("text", "i18n>orderID");
                columnOrderID.setHeader(labelOrderID);
                newTableJson.addColumn(columnOrderID);

                var columnFreight= new sap.m.Column();
                var labelFreight = new sap.m.Label();
                labelFreight.bindProperty("text", "i18n>freight");
                columnFreight.setHeader(labelFreight);
                newTableJson.addColumn(columnFreight);

                var columnShipAddress = new sap.m.Column();
                var labelShipAddress = new sap.m.Label();
                labelShipAddress.bindProperty("text", "i18n>shipAddress");
                columnShipAddress.setHeader(labelShipAddress);
                newTableJson.addColumn(columnShipAddress);

                var columnListItem = new sap.m.ColumnListItem();

                var cellOrderID = new sap.m.Label();
                cellOrderID.bindProperty("text", "JsonEmployees>OrderID");
                columnListItem.addCell(cellOrderID);

                var cellFreight = new sap.m.Label();
                cellFreight.bindProperty("text", "JsonEmployees>Freight");
                columnListItem.addCell(cellFreight);

                var cellShipAddress = new sap.m.Label();
                cellShipAddress.bindProperty("text", "JsonEmployees>ShipAddress");
                columnListItem.addCell(cellShipAddress);

                var oBindingInfo = {
                    model : "JsonEmployees",
                    path : "Orders",
                    template : columnListItem
                };

                newTableJson.bindAggregation("items", oBindingInfo);
                newTableJson.bindElement("JsonEmployees>" + oContext.getPath());
                ordersTable.addItem(newTableJson);*/