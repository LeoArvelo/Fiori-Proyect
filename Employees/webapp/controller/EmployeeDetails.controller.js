//@ts-nocheck
sap.ui.define([
"sap/ui/core/mvc/Controller",
"../model/formatter"

], 
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 * 
 */

function(Controller, formatter){
 
    return Controller.extend("logaligroup.Employees.controller.EmployeeDetails",{
        Formatter : formatter,
        onInit: function (){
            

        },
       
    onCreateIncidence: function (){

        var tableIncidence = this.getView().byId("tableIncidence");
        var newIncidence = sap.ui.xmlfragment ("logaligroup.Employees.fragment.NewIncidence", this);
        var incidenceModel = this.getView().getModel("incidenceModel");
        var oData = incidenceModel.getData();
        var index = oData.length;
        oData.push({index : index + 1});
        incidenceModel.refresh();
        newIncidence.bindElement("incidenceModel>/" + index);
        tableIncidence.addContent(newIncidence);
        },
        onDeleteIncidence: function (oEvent){

            var tableIncidence = this.getView().byId("tableIncidence");
            var rowIncidence = oEvent.getSource().getParent().getParent();
            var incidenceModel = this.getView().getModel("incidenceModel");
            var odata = incidenceModel.getData();
            var contextObject = rowIncidence.getBindingContext("incidenceModel");

            odata.splice(contextObject.index-1 ,1);

            for (var i in odata) {
                odata[i].index = parseInt(i) + 1;
                
            }

            incidenceModel.refresh();
            tableIncidence.removeContent(rowIncidence);

            for (var j in tableIncidence.getContent()){
                tableIncidence.getContent()[j].bindElement("incidenceModel>/"+j);
            }

        }

    });
});