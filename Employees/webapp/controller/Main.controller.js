//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
    
    ], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */
    
    function(Controller, JSONModel){
     "use strict";
        return Controller.extend("logaligroup.Employees.controller.Main",{
    
            onInit: function (){

                var oView = this.getView();

                var oJsonModelEmployees = new JSONModel();
                oJsonModelEmployees.loadData("./localService/mockdata/Employees.json", false);
                oView.setModel(oJsonModelEmployees, "JsonEmployees");

                var oJsonModelCountries = new JSONModel();
                oJsonModelCountries.loadData("./localService/mockdata/Countries.json", false)
                oView.setModel(oJsonModelCountries, "JsonCountries");

                var oJsonModelLayouts = new JSONModel();
                oJsonModelLayouts.loadData("./localService/mockdata/Layouts.json", false)
                oView.setModel(oJsonModelLayouts, "JsonLayouts");


                var oJsonModelConfig = new JSONModel({
                    visibleID : true,
                    visibleName : true,
                    visibleCountry : true,
                    visibleCity : false,
                    visibleBtnShowCity : true,
                    visibleBtnHideCity : false

                });

                oView.setModel(oJsonModelConfig,"JsonConfig");
                
                this._bus = sap.ui.getCore().getEventBus();
                this._bus.subscribe("flexible", "showEmployee", this.showEmployeeDetails, this );
            },

            showEmployeeDetails: function(category, nameEvent, path){
                var detailView= this.getView().byId("detailEmployeeView");
                detailView.bindElement("JsonEmployees>" + path);
                this.getView().getModel("JsonLayouts").setProperty("/ActiveKey", "TwoColumnsMidExpanded");

                var incidenceModel = new JSONModel ([]);
                detailView.setModel(incidenceModel, "incidenceModel");
                detailView.byId("tableIncidence").removeAllContent();
                
            }


    
        });
    });