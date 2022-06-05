/* eslint-disable no-undef */
//@ts-nocheck
sap.ui.define([


], function () {

    function dateFormat (date) {
       
        var timeDay = 24 * 60 * 60 * 1000;

        if (date) {
            var dateNow = new Date();
            var dateAFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern : "yyyy/MM/dd" });
            var dateNowFormat = new Date(dateAFormat.format(dateNow));
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
        
            switch (true) {
                case date.getTime() === dateNowFormat.getTime():

                    return oResourceBundle.getText("today");

                case date.getTime() === dateNowFormat.getTime() + timeDay:

                    return oResourceBundle.getText("tomorrow");

                case date.getTime() === dateNowFormat.getTime() - timeDay:

                    return oResourceBundle.getText("yesterday");

                default:
                    return "";
            }
        }

    }

    return {
        dateFormat : dateFormat
    };


});