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
                var oJsonModel = new JSONModel();
                var oView = this.getView();
                var i18Bundle = oView.getModel("i18n").getResourceBundle();

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
                oJsonModel.loadData("./localService/mockdata/Employees.json", false);
                oView.setModel(oJsonModel);


			},

            onFilter: function(){
                var oJSON = this.getView().getModel().getData();
                var filters = [];

                if(oJSON.EmployeeIdgeneral !== ""){
                    filters.push(new Filter("EmployeeID",FilterOperator.EQ, oJSON.EmployeeIdgeneral))

                }
                if(oJSON.CountryKey !== ""){
                    filters.push(new Filter("Country",FilterOperator.EQ, oJSON.CountryKey))

                }

                var oList = this.getView().byId("tableEmployee");
                var oBinding = oList.getBinding("items");
                oBinding.filter(filters);
            },


            onClearFilter: function(){
                var oModel= this.getView().getModel();
                oModel.setProperty("/EmployeeIdgeneral", "");
                oModel.setProperty("/CountryKey", "");
               
            },

            onShowPostalCode: function (oEvent){
                var itemPressed = oEvent.getSource();
                var oContext = itemPressed.getBindingContext();
                var ObjectContext = oContext.getObject();

                MessageToast.show(ObjectContext.PostalCode);

            }

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
