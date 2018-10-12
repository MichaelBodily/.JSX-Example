// Scheduled Transfers JSX file
//
//
//
//
//
//
//
// SCHEDULED TRANSFERS REACT MODULE NAMESPACE FOR HELPER FUNCTIONS:


const ScheduledTransfersReactModule = (function () {
    // local vars:
    var _scheduledTransfersData = null;
    var _currentScheduledEvent = null;
    var _occuranceDatesActive = [];
    var _occuranceDatesNotActive = [];
    var _dateExceptions;

    var _scheduledFrequencyEnum = {
        ONE_TIME: "oneTime",
        DAILY: "daily",
        WEEKLY: "weekly",
        BI_WEEKLY: "biWeekly",
        TWICE_MONTHLY: "twiceMonthly",
        MONTHLY: "monthly",
        MONTHNTH: "monthNth",
        YEARLY: "yearly",
        YEARNTH: "yearNth"
    };


    // load existing scheduled transfer data
    const _loadScheduledTransfers = () => {
        //console.log("Got here: _loadScheduledTransfers")

        var apiUrl = HomeBanking.BASE_URL + "api/scheduled-transfers/get-scheduled-transfers/true";   // false = do NOT load deleted. true = load deleted

        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function (data) {
                console.log("loadScheduledTransfers data: ", data);

                _scheduledTransfersData = data.scheduledTransfers;
                window.ScheduledTransfersAreaComponent.signalLoaded(false, _scheduledTransfersData.length);

                if (TransfersByMonthAreaComponent) {
                    TransfersByMonthAreaComponent.signalScheduledTransfersReactModuleLoaded(_scheduledTransfersData.length);    // setting a property in the transfers by month tab. data has loaded.
                }
            },
            error: function (xhr, err) {
                var terseError = $.parseJSON(xhr.responseText);
                console.log("terseError: ", terseError);
                console.log("Request Failed: " + err);
            }
        });
    };


    // save existing scheduled transfer edits
    const _saveEditScheduledTransfer = () => {
        // console.log("Got here: _saveEditScheduledTransfer.")

        _currentScheduledEvent.transferName = document.getElementById("ScheduledTransfersModalTransferDescriptionTextbox").value;
        _currentScheduledEvent.amountInCents = document.getElementById("ScheduledTransfersModalTransferAmountTextbox").value * 100;

        // TODO: This property is being sent properly to the endpoint, but is not being honored:
        _currentScheduledEvent.isActive = document.getElementById("ScheduledTransfersModalTransferActiveTextbox").checked === true ? true : false;

        var addUpdateRequest = {};
        addUpdateRequest.ScheduledTransfer = _currentScheduledEvent;

        var apiUrl = HomeBanking.BASE_URL + "api/scheduled-transfers/add-update-transfer";

        $.ajax({
            url: apiUrl,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(addUpdateRequest),
            success: function (data) {
                console.log("data: ", data);

                if (data === true) {
                    $("#ScheduledtransferModalProgressDiv").slideUp();
                    $("#scheduledTransferModalSaveTransferButton").hide();
                    $("#scheduledTransferModalCancelEditTransferButton").hide();
                    $("#scheduledTransferModalDismissAfterEditOrDeleteButton").slideDown();
                    $("#scheduledTransferModalDismissXButton").prop("disabled", false);
                    $("#ScheduledtransferModalSuccessDiv").slideDown();
                    $("#ScheduledtransferModalSuccessDiv").focus();
                    $("#ScheduledtransferModalSuccessDiv").html(ScheduledTransfersReactObject.Settings.Literals.scheduledTransferSaveEditSuccessMessageText);    //Your changes have been saved.
                } else {
                    $("#ScheduledtransferModalProgressDiv").slideUp();
                    $("#ScheduledtransferModalSuccessDiv").slideUp();

                    $("#ScheduledtransferModalFailedDiv").slideDown();
                    $("#ScheduledtransferModalFailedDiv").focus();
                    $("#ScheduledtransferModalFailedDiv").html(ScheduledTransfersReactObject.Settings.Literals.scheduledTransferSaveEditFailureMessageText);    //Sorry, there was an error. Please try again later.

                    $("#scheduledTransferModalDismissAfterEditOrDeleteButton").slideDown();
                    $("#scheduledTransferModalDismissXButton").prop("disabled", false);
                }
                window.ScheduledTransferDetailsModalComponent.bringToFocus();
            },
            error: function (xhr, err) {
                var terseError = $.parseJSON(xhr.responseText);
                var humanErrorMessage = typeof terseError.exceptionMessage === "undefined" ? terseError.message : terseError.exceptionMessage;

                $("#ScheduledtransferModalProgressDiv").slideUp();
                $("#ScheduledtransferModalSuccessDiv").slideUp();

                $("#ScheduledtransferModalFailedDiv").slideDown();
                $("#ScheduledtransferModalFailedDiv").focus();
                $("#ScheduledtransferModalFailedDiv").html("Error: " + humanErrorMessage);

                $("#scheduledTransferModalDismissAfterEditOrDeleteButton").slideDown();
                $("#scheduledTransferModalDismissXButton").prop("disabled", false);

                window.ScheduledTransferDetailsModalComponent.bringToFocus();
            }
        });
    };


    // set existing scheduled transfer to 'inactive'
    const _deactivateScheduledTransfer = (id) => {
        //console.log("Got here: _deactivateScheduledTransfer. id = ", id)

        var apiUrl = HomeBanking.BASE_URL + "api/scheduled-transfers/remove-transfer/" + id;

        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function (data) {
                console.log("data: ", data);

                if (data === true) {
                    // nothing... succeed silently
                } else {
                    document.getElementById("active_checkbox_" + id).checked = true;
                    alert("Error: We were unable to save your change.")
                }
            },
            error: function (xhr, err) {
                var terseError = $.parseJSON(xhr.responseText);
                var humanErrorMessage = typeof terseError.exceptionMessage === "undefined" ? terseError.message : terseError.exceptionMessage;
                console.log("terseError: ", terseError);
                console.log("Request Failed: " + err);

                document.getElementById("active_checkbox_" + id).checked = true;
                alert("Error: We were unable to save your change. " + humanErrorMessage);
            }
        });
    };


    // set existing scheduled transfer to 'active'
    const _activateScheduledTransfer = (scheduledTransfer, id) => {
        console.log("Got here: _activateScheduledTransfer. id = ", id)

        scheduledTransfer.isActive = true;

        var addUpdateRequest = {};
        addUpdateRequest.ScheduledTransfer = scheduledTransfer;

        var apiUrl = HomeBanking.BASE_URL + "api/scheduled-transfers/add-update-transfer";

        $.ajax({
            url: apiUrl,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(addUpdateRequest),
            success: function (data) {
                console.log("data: ", data);

                if (data === true) {
                    // nothing... succeed silently
                } else {
                    document.getElementById("active_checkbox_" + id).checked = false;
                    alert("Error: We were unable to save your change.")
                }

            },
            error: function (xhr, err) {
                var terseError = $.parseJSON(xhr.responseText);
                var humanErrorMessage = typeof terseError.exceptionMessage === "undefined" ? terseError.message : terseError.exceptionMessage;

                document.getElementById("active_checkbox_" + id).checked = false;
                alert("Error: We were unable to save your change. " + humanErrorMessage);
            }
        });
    };



    // delete existing scheduled transfer  (in reality, this is the same as setting a schedule transfer to 'inactive'
    const _deleteScheduledTransfer = (id) => {

        $("#ScheduledtransferModalProgressDiv").slideDown();
        $("#scheduledTransferModalEditTransferButton").prop("disabled", true);
        $("#scheduledTransferModalDeleteTransferButton").prop("disabled", true);
        $("#scheduledTransferModalDismissButton").prop("disabled", true);
        $("#scheduledTransferModalDismissXButton").prop("disabled", true);

        var apiUrl = HomeBanking.BASE_URL + "api/scheduled-transfers/remove-transfer/" + id;

        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function (data) {
                console.log("data: ", data);

                if (data === true) {
                    $("#ScheduledtransferModalProgressDiv").slideUp();
                    $("#scheduledTransferModalDismissButton").hide();
                    $("#scheduledTransferModalDismissAfterEditOrDeleteButton").slideDown();
                    $("#scheduledTransferModalDismissXButton").prop("disabled", false);
                    $("#ScheduledtransferModalSuccessDiv").slideDown();
                    $("#ScheduledtransferModalSuccessDiv").focus();
                    $("#ScheduledtransferModalSuccessDiv").html(ScheduledTransfersReactObject.Settings.Literals.scheduledTransferDeleteSuccessMessageText);    //Your scheduled transfer has been deleted.
                } else {
                    $("#ScheduledtransferModalProgressDiv").slideUp();
                    $("#ScheduledtransferModalSuccessDiv").slideUp();

                    $("#ScheduledtransferModalFailedDiv").slideDown();
                    $("#ScheduledtransferModalFailedDiv").focus();
                    $("#ScheduledtransferModalFailedDiv").html(ScheduledTransfersReactObject.Settings.Literals.scheduledTransferDeleteFailureMessageText);    //Sorry, there was an error. Please try again later.
                }
            },
            error: function (xhr, err) {
                var terseError = $.parseJSON(xhr.responseText);
                var humanErrorMessage = typeof terseError.exceptionMessage === "undefined" ? terseError.message : terseError.exceptionMessage;
                console.log("terseError: ", terseError);
                console.log("Request Failed: " + err);

                $("#ScheduledtransferModalProgressDiv").slideUp();
                $("#ScheduledtransferModalSuccessDiv").slideUp();

                $("#ScheduledtransferModalFailedDiv").slideDown();
                $("#ScheduledtransferModalFailedDiv").focus();
                $("#ScheduledtransferModalFailedDiv").html("Error: " + humanErrorMessage);
            }
        });
    };


    // set existing scheduled transfer to 'active'
    const _activateScheduledTransferFromButton = (scheduledTransfer, id) => {

        $("#ScheduledtransferModalProgressDiv").slideDown();
        $("#scheduledTransferModalEditTransferButton").prop("disabled", true);
        $("#scheduledTransferModalActivateTransferButton").prop("disabled", true);
        $("#scheduledTransferModalDismissButton").prop("disabled", true);
        $("#scheduledTransferModalDismissXButton").prop("disabled", true);

        scheduledTransfer.isActive = true;

        var addUpdateRequest = {};
        addUpdateRequest.ScheduledTransfer = scheduledTransfer;

        var apiUrl = HomeBanking.BASE_URL + "api/scheduled-transfers/add-update-transfer";

        $.ajax({
            url: apiUrl,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(addUpdateRequest),
            success: function (data) {
                console.log("data: ", data);

                if (data === true) {
                    $("#ScheduledtransferModalProgressDiv").slideUp();
                    $("#scheduledTransferModalDismissButton").hide();
                    $("#scheduledTransferModalDismissAfterEditOrDeleteButton").slideDown();
                    $("#scheduledTransferModalDismissXButton").prop("disabled", false);
                    $("#ScheduledtransferModalSuccessDiv").slideDown();
                    $("#ScheduledtransferModalSuccessDiv").focus();
                    $("#ScheduledtransferModalSuccessDiv").html(ScheduledTransfersReactObject.Settings.Literals.scheduledTransferActivateSuccessMessageText);
                } else {
                    $("#ScheduledtransferModalProgressDiv").slideUp();
                    $("#ScheduledtransferModalSuccessDiv").slideUp();

                    $("#ScheduledtransferModalFailedDiv").slideDown();
                    $("#ScheduledtransferModalFailedDiv").focus();
                    $("#ScheduledtransferModalFailedDiv").html(ScheduledTransfersReactObject.Settings.Literals.scheduledTransferActivateFailureMessageText);
                }

            },
            error: function (xhr, err) {
                var terseError = $.parseJSON(xhr.responseText);
                var humanErrorMessage = typeof terseError.exceptionMessage === "undefined" ? terseError.message : terseError.exceptionMessage;

                $("#ScheduledtransferModalProgressDiv").slideUp();
                $("#ScheduledtransferModalSuccessDiv").slideUp();

                $("#ScheduledtransferModalFailedDiv").slideDown();
                $("#ScheduledtransferModalFailedDiv").focus();
                $("#ScheduledtransferModalFailedDiv").html("Error: " + humanErrorMessage);
            }
        });
    };


    // reload this view:
    const _refreshScheduleTransferModule = () => {
        // console.log("Got here: _refreshScheduleTransferModule.");

        ScheduledTransfersAreaComponent.signalLoaded(true, null);
        ScheduledTransfersReactModule.loadScheduledTransfers();

        if (TransfersByMonthAreaComponent) {
            MonthlyTransfersReactModule.loadTransfersByMonth();
            TransfersByMonthAreaComponent.signalScheduledTransfersReactModuleLoaded(null);    // setting a property in the transfers by month tab. data has loaded.
        }

        $("body").removeClass("modal-open");
    }


    // get existing scheduled transfer from the _scheduledTransfersData object
    const _getScheduledEventFromScheduledTransfersData = (id) => {
        //console.log("Got here: _getScheduledEventFromScheduledTransfersData. id = ", id);

        var lookup = {};

        if (_scheduledTransfersData && _scheduledTransfersData.length > 0) {
            for (var i = 0; i < _scheduledTransfersData.length; i++) {
                lookup[_scheduledTransfersData[i].scheduledTransferId] = _scheduledTransfersData[i];
            }
        }

        return lookup[id];
    };


    // map data. check for it's existence first
    const _mapScheduledTransfersData = () => {
        // check for datas existence first:
        if (typeof _scheduledTransfersData === "undefined" || _scheduledTransfersData === null || _scheduledTransfersData.length === 0) {
            return (<div style={{ textAlign: 'center' }}> Loading... </div>);
        } else {
            return _scheduledTransfersData.map(ScheduledTransfersReactModule.displayScheduledTransfersData);
        }
    }


    // render scheduled transfer data. item is a scheduled transfer data object
    const _displayScheduledTransfersData = (item) => {
        // console.log("Got here: _displayScheduledTransfersData")

        return (
            <div className="schedule-parent-item widget-row" data-transfer-id="TransferID" key={item.scheduledTransferId}>
                <ul className="list-unstyled widget-cell">
                    <li role="presentation">
                        <a href="#" className="scheduled-transfer-description" onClick={() => ScheduledTransfersReactModule.showDetailsModal(item.scheduledTransferId)}>{item.transferName}</a>
                    </li>

                    <li className="text-muted" role="presentation">
                        {item.lastPaidDateUtc === null ? "No past payments found" : "Last successful tranfer made on: " + _formatDate(item.lastPaidDateUtc.toString().substr(0, 10))}
                    </li>

                    <li className="text-muted" role="presentation">
                        <small>
                            {ScheduledTransfersReactModule.humanReadableOccurrenceDescription(item)}
                        </small>
                    </li>
                </ul>

                <div className="widget-cell">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" className="status-checkbox" id={"active_checkbox_" + item.scheduledTransferId} defaultChecked={item.isActive ? "checked" : null}
                                onClick={(e) => ScheduledTransfersReactModule.confirmActivationChange(e, item.scheduledTransferId)} aria-label="is active?" />
                            <span className="status-text">Active</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    };


    // set edit mode prior to editing existing scheduled transfer from the _scheduledTransfersData object
    const _setEditTransferMode = () => {
        // console.log("Got here: _setEditTransferMode");

        // divs
        $("#scheduledTransferDetailsDefinitionList").slideUp();
        $("#ScheduledTransferModalEditTransferDiv").slideDown();

        // buttons
        $("#scheduledTransferModalEditTransferButton").hide();
        $("#scheduledTransferModalDeleteTransferButton").hide();
        $("#scheduledTransferModalSaveTransferButton").slideDown();
        $("#scheduledTransferModalCancelEditTransferButton").slideDown();
        $("#scheduledTransferModalDismissButton").hide();

        // pre-populate the form values:
        document.getElementById("ScheduledTransfersModalTransferDescriptionTextbox").value = _currentScheduledEvent.transferName;
        document.getElementById("ScheduledTransfersModalTransferAmountTextbox").value = HomeBanking.Utilities.Currency.FormatCentsToDollars(_currentScheduledEvent.amountInCents).replace(/^\$/, "");
    };


    // cancel edit existing scheduled transfer from the _scheduledTransfersData object
    const _cancelSetEditTransferMode = () => {
        // console.log("Got here: _setEditTransferMode");

        // divs
        $("#scheduledTransferDetailsDefinitionList").slideDown();
        $("#ScheduledTransferModalEditTransferDiv").slideUp();

        // buttons
        $("#scheduledTransferModalEditTransferButton").slideDown();
        $("#scheduledTransferModalDeleteTransferButton").slideDown();
        $("#scheduledTransferModalSaveTransferButton").hide();
        $("#scheduledTransferModalCancelEditTransferButton").hide();
        $("#scheduledTransferModalDismissButton").slideDown();

        // reset validation stuff:
        $("#ScheduledtransferModalValidationDiv").empty();
        $("#ScheduledtransferModalValidationDiv").hide();
        document.getElementById("ScheduledTransfersModalTransferAmountTextbox").parentNode.style.outline = "none";
        document.getElementById("ScheduledTransfersModalTransferDescriptionTextbox").style.outline = "none";

        // upcoming payment dates area:
        $("#SkipPaymentsCheckboxForm input:checkbox").prop("checked", false);      // uncheck all checkboxes in 'skip' section of upcoming payments in modal
        $("#ScheduledtransferModalDateExceptionSuccessDiv").slideUp();
        $("#ScheduledtransferModalDateExceptionFailedDiv").slideUp();
    };


    // delete existing scheduled transfer confirm before really deleting it.
    const _deleteTransferConfirm = () => {
        //console.log("Got here: _deleteTransfer");

        if (confirm("Are you sure you want to delete this scheduled transfer? This will deactivate all future occurrences.")) {
            ScheduledTransfersReactModule.deleteScheduledTransfer(_currentScheduledEvent.scheduledTransferId);
        }
    };

    // activate existing scheduled transfer confirm before really deleting it.
    const _activateTransferConfirm = () => {
        //console.log("Got here: _activateTransfer");

        if (confirm("Are you sure you want to activate this scheduled transfer? This will activate all future occurrences.")) {
            ScheduledTransfersReactModule.activateScheduledTransferFromButton(_currentScheduledEvent, _currentScheduledEvent.scheduledTransferId);
            $("#ScheduledtransferModalProgressDiv").slideUp();
        }
    };


    // validate scheduled transfer edits
    const _validateScheduledTransferEdit = () => {
        // console.log("Got here: _validateScheduledTransferEdit");

        var EditTransfersFormFormValid;
        var TransfersFormAmountRegx = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
        var TransfersFormTextRegx = /^[A-Za-z\d\-_.,!"'?\s]+$/;

        $("#ScheduledtransferModalValidationDiv").empty();
        $("#ScheduledtransferModalValidationDiv").html("Please correct the following errors:");

        // payment amount
        if (document.getElementById("ScheduledTransfersModalTransferAmountTextbox").value === "") {                                     // required
            document.getElementById("ScheduledTransfersModalTransferAmountTextbox").parentNode.style.outline = "1px solid red";
            $("#ScheduledtransferModalValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessagePaymentAmountText);    //Please enter the amount of the payment.
            EditTransfersFormFormValid = false;
            // Regex test
        } else if (!TransfersFormAmountRegx.test(document.getElementById("ScheduledTransfersModalTransferAmountTextbox").value)) {
            document.getElementById("ScheduledTransfersModalTransferAmountTextbox").parentNode.style.outline = "1px solid red";
            $("#ScheduledtransferModalValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageValidAmountText);    //Please enter a valid amount.
            EditTransfersFormFormValid = false;
            // validate transfer limit from
        } else if (_currentScheduledEvent && _currentScheduledEvent.limitTo !== null
            && HomeBanking.Utilities.Currency.ParseDollarsToCents(document.getElementById("ScheduledTransfersModalTransferAmountTextbox").value) > _currentScheduledEvent.limitTo) {
            document.getElementById("ScheduledTransfersModalTransferAmountTextbox").parentNode.style.outline = "1px solid red";
            $("#ScheduledtransferModalValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageToTransferLimitText + " Limit: " + HomeBanking.Utilities.Currency.FormatCentsToDollars(_currentScheduledEvent.limitTo, false, false));    //Amount entered exceeds the transfer to account dollar limit.
            EditTransfersFormFormValid = false;
        } else {
            document.getElementById("ScheduledTransfersModalTransferAmountTextbox").parentNode.style.outline = "none";
        }

        // description
        if (document.getElementById("ScheduledTransfersModalTransferDescriptionTextbox").value === "") {
            document.getElementById("ScheduledTransfersModalTransferDescriptionTextbox").style.outline = "1px solid red";
            $("#ScheduledtransferModalValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageScheduledTransferDescriptionText);    //Please enter a description for your recurring payment.
            EditTransfersFormFormValid = false;
        } else if (!TransfersFormTextRegx.test(document.getElementById("ScheduledTransfersModalTransferDescriptionTextbox").value)) {
            document.getElementById("ScheduledTransfersModalTransferDescriptionTextbox").style.outline = "1px solid red";
            $("#ScheduledtransferModalValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageScheduledTransDescNotValidText);    //Please enter a valid description for your recurring payment.
            EditTransfersFormFormValid = false;
        } else {
            document.getElementById("ScheduledTransfersModalTransferDescriptionTextbox").style.outline = "none";
        }


        // Note:
        // Active/Inactive -- there is no validation necessary

        // check for anything that may have failed above
        if (EditTransfersFormFormValid === false) {
            $("#ScheduledtransferModalValidationDiv").slideDown("normal");
            $("#ScheduledtransferModalValidationDiv").focus("normal");
            $("#scheduledTransferModalSaveTransferButton").prop("disabled", false);
            return false;
        }

        // Form is Valid: show/hide appropriate stuff:
        $("#ScheduledtransferModalValidationDiv").hide();
        $("#ScheduledtransferModalSuccessDiv").hide();
        $("#ScheduledtransferModalFailedDiv").hide();
        $("#ScheduledtransferModalProgressDiv").slideDown();
        $("#scheduledTransferModalSaveTransferButton").prop("disabled", true);
        $("#scheduledTransferModalCancelEditTransferButton").prop("disabled", true);
        $("#scheduledTransferModalDismissXButton").prop("disabled", true);

        // call the ajax:
        ScheduledTransfersReactModule.saveEditScheduledTransfer();
    }


    // show transfer details modal:
    const _showDetailsModal = (id) => {
        //console.log("Got here: _showDetailsModal(). id = ", id);

        _currentScheduledEvent = _getScheduledEventFromScheduledTransfersData(id);
        console.log("_currentScheduledEvent = ", _currentScheduledEvent);

        $("#scheduledTransferDetailsModal").modal({
            backdrop: 'static', // to prevent closing by clicking the dark grey background surrounding the modal
            keyboard: false // to prevent closing with Esc button  
        });

        setTimeout(ScheduledTransfersReactModule.setTransferModalDetails, 50);     // we must use a timeout because the modal doesn't exist yet when first invoked.
    }


    // set the modal's details:
    const _setTransferModalDetails = () => {
        //console.log("Got here: _setTransferModalDetails()");

        $("#scheduledTransferDetailsDefinitionList").slideDown();
        $("#ScheduledTransferModalEditTransferDiv").slideUp();
        document.getElementById("scheduledTransferDescriptionDiv").innerText = "Transfers occur " + _humanReadableOccurrenceDescription(_currentScheduledEvent);
        document.getElementById("scheduledTransferDescriptionDot").innerText = _currentScheduledEvent.transferName;
        document.getElementById("scheduledTransferAmountDot").innerText = HomeBanking.Utilities.Currency.FormatCentsToDollars(_currentScheduledEvent.amountInCents);
        document.getElementById("scheduledTransferStatusDot").innerText = _currentScheduledEvent.isActive === true ? "Active" : "Not Active";

        // if current scheduled event isn't active, don't bother to show the 'edit' and 'delete' buttons:
        if (_currentScheduledEvent.isActive === false) {
            document.getElementById("scheduledTransferModalEditTransferButton").style.display = "none";
            document.getElementById("scheduledTransferModalDeleteTransferButton").style.display = "none";
            document.getElementById("scheduledTransferModalActivateTransferButton").style.display = "inline-block";
        } else {
            document.getElementById("scheduledTransferModalEditTransferButton").style.display = "inline-block";
            document.getElementById("scheduledTransferModalDeleteTransferButton").style.display = "inline-block";
            document.getElementById("scheduledTransferModalActivateTransferButton").style.display = "none";
        }

        _occuranceDatesActive = [];
        _occuranceDatesNotActive = [];

        var apiUrl = HomeBanking.BASE_URL + "api/scheduled-transfers/get-exceptions/" + _currentScheduledEvent.scheduledTransferId;

        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function (data) {
                // console.log("get-exceptions data: ", data.scheduledTransferExceptions);     

                if (data.scheduledTransferExceptions.length > 0) {
                    for (var i = 0; i < data.scheduledTransferExceptions.length; i++) {
                        if (data.scheduledTransferExceptions[i].id === 0 && data.scheduledTransferExceptions[i].shouldRun === true) {
                            _occuranceDatesActive.push(data.scheduledTransferExceptions[i])
                        } else if (data.scheduledTransferExceptions[i].shouldRun === false) {
                            _occuranceDatesNotActive.push(data.scheduledTransferExceptions[i])
                        }
                    }
                }

                window.ScheduledTransferDetailsModalComponent.signalLoaded(_currentScheduledEvent, _occuranceDatesActive, _occuranceDatesNotActive);
            },
            error: function (xhr, err) {
                var terseError = $.parseJSON(xhr.responseText);
                console.log("terseError: ", terseError);
                console.log("Request Failed: " + err);
            }
        });
    }


    // refresh exemption dates:
    const _refreshExemptionDates = () => {
        $("#ScheduledtransferModalDateExceptionSuccessDiv").slideUp();
        //$("#scheduledTransferModalDismissAfterDateExemptionButton").slideUp();
        $("#scheduledTransferModalRefreshDateExemptionButton").slideUp();
        window.ScheduledTransferDetailsModalComponent.signalLoaded(_currentScheduledEvent, null, null);
        _setTransferModalDetails();

        $("body").removeClass("modal-open");
    }


    // Map history items in modal:
    const _mapHistoryItems = (item) => {
        return (
            <div className="history-items-container">
                <div className="sub-div-history-items div-1-of-3" >
                    <strong>{MonthlyTransfersReactModule.formatNetDateToHumanReadableString(new Date(item.transferDateUtc).toString())}</strong>
                </div>

                <div className="sub-div-history-items div-1-of-3">
                    Result: {item.result}
                </div>

                <div className="sub-div-history-items div-1-of-3" style={{ textAlign: "right" }}>
                    Transfer Notes: {item.transferNotes !== null ? item.transferNotes : "None"}
                </div>
            </div>
        );
    }


    // Map upcoming payment dates in modal:
    const _mapUpcomingPaymentDates = (item) => {
        return (
            <div className="history-items-container">
                <div className="sub-div-history-items div-1-of-3" >
                    {MonthlyTransfersReactModule.formatNetDateToHumanReadableString(new Date(item.runAtUtc).toString())} <br />
                </div>

                <div className="sub-div-history-items div-1-of-3" style={{ textAlign: "right" }}>
                    Skip?&nbsp;&nbsp;<input type="checkbox" value={item.runAtUtc} name={"skip_checkbox_" + _currentScheduledEvent.scheduledTransferId + "_" + item} aria-label="skip?" tabIndex="0" />
                </div>
            </div>
        );
    }


    // Map exempted payment dates in modal:
    const _mapExemptionPaymentDates = (item) => {
        return (
            <div className="history-items-container">
                <div className="sub-div-history-items div-1-of-3" >
                    {MonthlyTransfersReactModule.formatNetDateToHumanReadableString(new Date(item.runAtUtc).toString())} <br />
                </div>

                <div className="sub-div-history-items div-1-of-3" style={{ textAlign: "right" }}>
                    Restore?&nbsp;&nbsp;<input type="checkbox" value={item.id} name={"restore_checkbox_" + item.id} tabIndex="0" />
                </div>
            </div>
        );
    }


    // confirm an activation change. this occurs when a user clicks the "active" checkbox in the main table
    // since these checkboxes are built on the fly, react sends a SyntheticEvent. To use the underlying event, you must use the nativeEvent property
    // in this case, we must do so to get ahold of the 'checked' property of the checkbox.
    // send an ajax call to change the selected scheduled transfer. 
    // the remove schedule transfer endpoint should be used to turn it off. To turn it back on send it through the add-update method 
    const _confirmActivationChange = (e, id) => {
        var setActive = null;
        var setInactive = null;

        // activate:
        if (e.nativeEvent.target.checked === true) {
            setActive = confirm("Are you sure you want to activate this scheduled transfer? This will activate all future occurrences.");

            if (setActive) {
                _currentScheduledEvent = ScheduledTransfersReactModule.getScheduledEventFromScheduledTransfersData(id);
                ScheduledTransfersReactModule.activateScheduledTransfer(_currentScheduledEvent, id);
            } else {
                e.nativeEvent.target.checked = false;
            }
        } else {            // de-activate:
            setInactive = confirm("Are you sure you want to deactivate this scheduled transfer? This will deactivate all future occurrences.");

            if (setInactive) {
                ScheduledTransfersReactModule.deactivateScheduledTransfer(id);
            } else {
                e.nativeEvent.target.checked = true;
            }
        }
    }

    // return a human readable string of the transfers frequency
    const _humanReadableOccurrenceDescription = (item) => {
        var frequency = item.scheduledEvent.recurrenceType;
        var resultString = "";

        switch (frequency) {
            case _scheduledFrequencyEnum.ONE_TIME:     // One Time Occurance - not used. One Time Occurrences use the 'DAILY' setting with a maxOccurrences property set to 1
                resultString += "One time occurance";

                break;

            case _scheduledFrequencyEnum.DAILY:     // DAILY
                if (item.scheduledEvent.maxOccurences === 1) {      // One Time Occurance if maxOccurrences === 1
                    resultString += "One time occurance";
                    resultString += " on " + _formatDate(item.scheduledEvent.startTimeUtc.toString().substr(0, 10));
                } else {
                    if (item.scheduledEvent.interval !== null && item.scheduledEvent.interval > 1) {
                        resultString += "Every " + item.scheduledEvent.interval + " days";
                    } else {
                        resultString += "Every day";
                    }
                }
                break;

            case _scheduledFrequencyEnum.WEEKLY:     // WEEKLY
                resultString += "Every ";

                if (item.scheduledEvent.dayOfWeekMask !== null && item.scheduledEvent.dayOfWeekMask.length > 0) {
                    $.each(item.scheduledEvent.dayOfWeekMask, function (index, value) {
                        resultString += value + ", ";
                    });
                    resultString = resultString.substr(0, resultString.length - 2);
                    resultString += " every ";
                }

                if (item.scheduledEvent.interval !== null && item.scheduledEvent.interval > 1) {
                    resultString += item.scheduledEvent.interval + " weeks";
                } else {
                    resultString += "week";
                }
                break;

            case _scheduledFrequencyEnum.TWICE_MONTHLY:     // TWICE MONTHLY
                resultString += "Twice a month on day " + item.scheduledEvent.dayOfMonth + " and day ";
                resultString += item.scheduledEvent.secondDayOfMonth + " every " + item.scheduledEvent.interval + " month(s)";
                break;

            case _scheduledFrequencyEnum.MONTHLY:     // MONTHLY
                resultString += "On day " + item.scheduledEvent.dayOfMonth + " every " + item.scheduledEvent.interval + " month(s)";
                break;

            case _scheduledFrequencyEnum.MONTHNTH:     // MONTHLY
                var humanReadableInstance = _getNth(item.scheduledEvent.instance);
                resultString += "the " + item.scheduledEvent.instance + humanReadableInstance + " ";

                if (item.scheduledEvent.dayOfWeekMask !== null && item.scheduledEvent.dayOfWeekMask.length > 0) {
                    $.each(item.scheduledEvent.dayOfWeekMask, function (index, value) {
                        resultString += value + ", ";
                    });
                    resultString = resultString.substr(0, resultString.length - 2);
                }

                resultString += " every " + item.scheduledEvent.interval + " month(s)";
                break;

            case _scheduledFrequencyEnum.YEARLY:     // YEARLY
                var humanReadableInstance = _getNth(item.scheduledEvent.dayOfMonth);
                var humanReadableMonth = _getMonth(item.scheduledEvent.monthOfYear);
                resultString += "Every " + humanReadableMonth + " " + item.scheduledEvent.dayOfMonth + humanReadableInstance;

                if (item.scheduledEvent.interval !== null && item.scheduledEvent.interval > 1) {
                    resultString += " every " + item.scheduledEvent.interval + " years";
                } else {
                    resultString += "every year";
                }
                break;

            case _scheduledFrequencyEnum.YEARNTH:
                if (item.scheduledEvent.instance === null) {
                    var humanReadableInstance = _getNth(item.scheduledEvent.dayOfMonth);
                    var humanReadableMonth = _getMonth(item.scheduledEvent.monthOfYear);
                    resultString += "Every " + humanReadableMonth + " " + item.scheduledEvent.dayOfMonth + humanReadableInstance;
                } else {
                    var humanReadableInstance = _getNth(item.scheduledEvent.instance);
                    var humanReadableMonth = _getMonth(item.scheduledEvent.monthOfYear);
                    resultString += "On the " + item.scheduledEvent.instance + humanReadableInstance + " ";

                    if (item.scheduledEvent.dayOfWeekMask !== null && item.scheduledEvent.dayOfWeekMask.length > 0) {
                        $.each(item.scheduledEvent.dayOfWeekMask, function (index, value) {
                            resultString += value + ", ";
                        });
                        resultString = resultString.substr(0, resultString.length - 2);
                    }

                    resultString += " of " + humanReadableMonth;
                }

                if (item.scheduledEvent.interval !== null && item.scheduledEvent.interval > 1) {
                    resultString += " every " + item.scheduledEvent.interval + " years";
                } else {
                    resultString += " every year";
                }

                break;
        }

        // ending date/occurance data:
        if (Date.parse(item.scheduledEvent.endTimeUtc)) {
            resultString += " ending " + _formatDate(item.scheduledEvent.endTimeUtc.toString().substr(0, 10));
        }

        if (item.scheduledEvent.maxOccurences !== null) {
            if (item.scheduledEvent.maxOccurences === 1) {
                resultString += " ending after " + item.scheduledEvent.maxOccurences + " occurrence";
            } else {
                resultString += " ending after " + item.scheduledEvent.maxOccurences + " occurrences";
            }
        }

        resultString += ". From " + _maskAccount(item.fromAccount.toString()) + " to " + _maskAccount(item.toAccount.toString());

        return resultString;
    }


    // Mask the account numbers
    const _maskAccount = (accountString) => {
        if (accountString === null || accountString === "undefined" || accountString === "") {
            return "---";
        }

        if (accountString === "n/a") {
            return "n/a";
        }

        // show last three digits of account number only
        var nativeString = "****" + accountString.substring(accountString.length - 3);

        return nativeString;
    }


    // return a human readable "nth" string. eg: 1st, 2nd, 3rd etc.
    const _getNth = (which) => {
        switch (which % 100) {
            case 11, 12, 13:
                return "th";
                break;
        }

        switch (which % 10) {
            case 1:
                return "st";
                break;

            case 2:
                return "nd";
                break;

            case 3:
                return "rd";
                break;

            default:
                return "th";
                break;
        }
    }


    // return a human readable month. in this case, months are 1 based and not zero based
    const _getMonth = (month) => {
        switch (month) {
            case 1:
                return "January";
                break;
            case 2:
                return "February";
                break;
            case 3:
                return "March";
                break;
            case 4:
                return "April";
                break;
            case 5:
                return "May";
                break;
            case 6:
                return "June";
                break;
            case 7:
                return "July";
                break;
            case 8:
                return "August";
                break;
            case 9:
                return "September";
                break;
            case 10:
                return "October";
                break;
            case 11:
                return "November";
                break;
            case 12:
                return "December";
                break;
            default:
                return "January";
        }
    }


    // Format a date into a human readable string and return the string
    const _formatDate = (date) => {
        var sDate = date

        // do a couple of checks:
        if (sDate.indexOf("-") !== -1) { var sDate = sDate.replace(/-/gi, ''); }
        if (!/^(\d){8}$/.test(sDate) || sDate === NaN || sDate === undefined) return ". Due date not known.";

        var y = sDate.substr(0, 4),
            m = sDate.substr(4, 2) - 1,
            d = sDate.substr(6, 2);
        var mdDate = new Date(y, m, d);
        var month = mdDate.getMonth();
        var day = mdDate.getDate();
        var year = mdDate.getFullYear();

        switch (month) {
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "April";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                break;
            case 6:
                month = "July";
                break;
            case 7:
                month = "August";
                break;
            case 8:
                month = "September";
                break;
            case 9:
                month = "October";
                break;
            case 10:
                month = "November";
                break;
            case 11:
                month = "December";
                break;
            default:
                month = "January";
        }

        var msDateString = month + " " + day + ", " + year;
        return msDateString;
    };


    //  Enable printing of modal when the "print" button is clicked in the confirmation modal
    const _printPage = (e) => {
        e.preventDefault();
        $("#master-page-div").addClass("hidden-print");
        var oPrintArea = $(".modal-print-area").clone().css("width", "500px").prependTo("body");
        window.print();
        oPrintArea.remove();
        return false;
    };


    // Restore the print area of the page on modal dismissal
    const _handleDetailsModalClosed = () => {
        $("#master-page-div").removeClass("hidden-print");

        // reset validation stuff:
        $("#ScheduledtransferModalValidationDiv").empty();
        $("#ScheduledtransferModalValidationDiv").hide();
        document.getElementById("ScheduledTransfersModalTransferAmountTextbox").parentNode.style.outline = "none";
        document.getElementById("ScheduledTransfersModalTransferDescriptionTextbox").style.outline = "none";
        $("#scheduledTransferModalCancelEditTransferButton").slideUp();
        $("#scheduledTransferModalSaveTransferButton").slideUp();

        $("#SkipPaymentsCheckboxForm input:checkbox").prop("checked", false);      // uncheck all checkboxes in 'skip' section of upcoming payments in modal
        $("#ScheduledtransferModalDateExceptionSuccessDiv").slideUp();
        $("#ScheduledtransferModalDateExceptionFailedDiv").slideUp();
    }


    // process skip payments:
    const _processSkipPaymentForm = () => {
        _dateExceptions = [];   // empty the array

        // get all the checkboxes from the form:
        var formCheckboxes = $("#SkipPaymentsCheckboxForm input:checkbox");

        // add the 'checked' checkboxes to the array for processing:
        for (var i = 0; i < formCheckboxes.length; i++) {
            if (formCheckboxes[i].checked === true) {
                _dateExceptions.push(formCheckboxes[i].value)
            }
        }

        // ajax each of the items:
        if (_dateExceptions.length > 0) {
            var apiUrl = HomeBanking.BASE_URL + "api/scheduled-transfers/add-update-exception";

            for (var j = 0; j < _dateExceptions.length; j++) {
                var scheduledTransferException = {};
                scheduledTransferException.RunAtUtc = _dateExceptions[j];
                scheduledTransferException.ScheduledTransferId = _currentScheduledEvent.scheduledTransferId;
                scheduledTransferException.ShouldRun = false;

                var addUpdateScheduledTransferExceptionRequest = {};
                addUpdateScheduledTransferExceptionRequest.ScheduledTransferException = scheduledTransferException;

                $.ajax({
                    url: apiUrl,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(addUpdateScheduledTransferExceptionRequest),
                    success: function (data) {
                        if (data === true) {
                            $("#scheduledTransferModalSkipPaymentButton").slideUp();
                            $("#ScheduledtransferModalDateExceptionSuccessDiv").slideDown();
                            $("#ScheduledtransferModalDateExceptionSuccessDiv").focus();
                        } else {
                            $("#ScheduledtransferModalDateExceptionFailedDiv").slideDown();
                            $("#ScheduledtransferModalDateExceptionFailedDiv").focus();
                        }
                        $("#scheduledTransferModalDismissAfterDateExemptionButton").slideDown();
                        $("#scheduledTransferModalRefreshDateExemptionButton").slideDown();
                    },
                    error: function (xhr, err) {
                        var terseError = $.parseJSON(xhr.responseText);
                        console.log("terseError: ", terseError);
                        console.log("Request Failed: " + err);

                        $("#ScheduledtransferModalDateExceptionFailedDiv").slideDown();
                        $("#ScheduledtransferModalDateExceptionFailedDiv").focus();
                        $("#scheduledTransferModalDismissAfterDateExemptionButton").slideDown();
                    }
                });
            }
        }
    }


    // process restore payments:
    const _processRestorePaymentForm = () => {
        _dateExceptions = [];   // empty the array

        // get all the checkboxes from the form:
        var formCheckboxes = $("#RestorePaymentsCheckboxForm input:checkbox");

        // add the 'checked' checkboxes to the array for processing:
        for (var i = 0; i < formCheckboxes.length; i++) {
            if (formCheckboxes[i].checked === true) {
                _dateExceptions.push(formCheckboxes[i].value)
            }
        }

        // ajax each of the items:
        if (_dateExceptions.length > 0) {
            for (var j = 0; j < _dateExceptions.length; j++) {
                var apiUrl = HomeBanking.BASE_URL + "api/scheduled-transfers/delete-exception/" + _dateExceptions[j];

                $.ajax({
                    url: apiUrl,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        if (data === true) {
                            $("#scheduledTransferModalSkipPaymentButton").slideUp();
                            $("#ScheduledtransferModalDateExceptionSuccessDiv").slideDown();
                            $("#ScheduledtransferModalDateExceptionSuccessDiv").focus();
                        } else {
                            $("#ScheduledtransferModalDateExceptionFailedDiv").slideDown();
                            $("#ScheduledtransferModalDateExceptionFailedDiv").focus();
                        }
                        $("#scheduledTransferModalDismissAfterDateExemptionButton").slideDown();
                        $("#scheduledTransferModalRefreshDateExemptionButton").slideDown();
                    },
                    error: function (xhr, err) {
                        var terseError = $.parseJSON(xhr.responseText);
                        console.log("terseError: ", terseError);
                        console.log("Request Failed: " + err);

                        $("#ScheduledtransferModalDateExceptionFailedDiv").slideDown();
                        $("#ScheduledtransferModalDateExceptionFailedDiv").focus();
                        $("#scheduledTransferModalDismissAfterDateExemptionButton").slideDown();
                    }
                });
            }
        }
    }



    // Public interface:
    return {
        loadScheduledTransfers: _loadScheduledTransfers,
        mapScheduledTransfersData: _mapScheduledTransfersData,
        displayScheduledTransfersData: _displayScheduledTransfersData,
        showDetailsModal: _showDetailsModal,
        setTransferModalDetails: _setTransferModalDetails,
        printPage: _printPage,
        handleDetailsModalClosed: _handleDetailsModalClosed,
        confirmActivationChange: _confirmActivationChange,
        getScheduledEventFromScheduledTransfersData: _getScheduledEventFromScheduledTransfersData,
        deactivateScheduledTransfer: _deactivateScheduledTransfer,
        humanReadableOccurrenceDescription: _humanReadableOccurrenceDescription,
        setEditTransferMode: _setEditTransferMode,
        cancelSetEditTransferMode: _cancelSetEditTransferMode,
        deleteTransferConfirm: _deleteTransferConfirm,
        activateTransferConfirm: _activateTransferConfirm,
        deleteScheduledTransfer: _deleteScheduledTransfer,
        activateScheduledTransfer: _activateScheduledTransfer,
        activateScheduledTransferFromButton: _activateScheduledTransferFromButton,
        refreshScheduleTransferModule: _refreshScheduleTransferModule,
        validateScheduledTransferEdit: _validateScheduledTransferEdit,
        saveEditScheduledTransfer: _saveEditScheduledTransfer,
        mapHistoryItems: _mapHistoryItems,
        mapUpcomingPaymentDates: _mapUpcomingPaymentDates,
        mapExemptionPaymentDates: _mapExemptionPaymentDates,
        processSkipPaymentForm: _processSkipPaymentForm,
        processRestorePaymentForm: _processRestorePaymentForm,
        refreshExemptionDates: _refreshExemptionDates
    };
}());









// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================








// REACT COMPONENT CLASSES:
// REACT COMPONENT CLASSES:
// REACT COMPONENT CLASSES:
// REACT COMPONENT CLASSES:
// REACT COMPONENT CLASSES:







// SCHEDULED TRANSFERS AREA:
class ScheduledTransfersArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataLength: null
        };
    }

    componentDidMount() {
        window.ScheduledTransfersAreaComponent = this;    // so this component can be reached by the TransfersReactModule code
        ScheduledTransfersReactModule.loadScheduledTransfers();
    }

    componentWillUpdate() {
    }

    componentWillUnmount() {
    }

    signalLoaded(isLoading, dataLength) {
        this.setState({
            loading: isLoading,
            dataLength: dataLength
        });
    }

    // render method
    render() {
        if (this.state.loading === true) {
            return (
                <div className="scheduled-transfers-container">
                    <div id="scheduledTransfersLoadingDataDiv" style={{ textAlign: 'center' }}>
                        <img src={ScheduledTransfersReactObject.Settings.spinnerFilename} alt="Loading…" />&nbsp;Loading...
					</div>
                </div>
            )
        }

        if (this.state.loading === false && this.state.dataLength === 0) {
            return (
                <div className="scheduled-transfers-container">
                    <div id="scheduledTransfersNoDataDiv" className="alert alert-info">
                        <div>You don't have any scheduled transfers. </div>
                    </div>
                </div>
            )
        }

        if (this.state.loading === false && this.state.dataLength > 0) {
            return (
                <div className="scheduled-transfers-container">
                    <div id="scheduledTransfersDataDiv">
                        <div className="widget-table">
                            {ScheduledTransfersReactModule.mapScheduledTransfersData()}
                        </div>
                    </div>

                    <div>
                        <ScheduledTransferDetailsModal />
                    </div>
                </div>
            )
        }

        return (
            <div className="scheduled-transfers-container">
                <div id="scheduledTransfersLoadingDataDiv" style={{ textAlign: 'center' }}>
                    <img src={ScheduledTransfersReactObject.Settings.spinnerFilename} alt="Loading…" />&nbsp;Loading...
				</div>
            </div>
        )
    };
};




// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================




// TRANSFER DETAILS CONFIRMATION MODAL:
class ScheduledTransferDetailsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScheduledEvent: null,
            occuranceDatesActive: null,
            occuranceDatesNotActive: null
        };
    }

    componentDidMount() {
        this.modalTarget = document.createElement('div');
        this.modalTarget.className = '';
        document.body.appendChild(this.modalTarget);

        this._render();

        // Do NOT name this the same as this component's name (class ScheduledTransferDetailsModal) or you will get reload bugs:
        window.ScheduledTransferDetailsModalComponent = this;
    }

    componentWillUpdate() {
        this._render();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.modalTarget);
        document.body.removeChild(this.modalTarget);
    }

    // this is called from the ScheduledTransfersReactModule component, when the histories are available:
    signalLoaded(eventItem, activeDates, nonActiveDates) {
        this.setState({
            currentScheduledEvent: eventItem,
            occuranceDatesActive: activeDates,
            occuranceDatesNotActive: nonActiveDates
        })

        this._render();
    }

    bringToFocus() {
        setTimeout(function () {
            document.getElementById("TransferConfirmationModalscheduledTransferDetailsModalHiddenTitle").focus();
        }, 100);
    }

    _render() {
        ReactDOM.render(
            <div className="modal modal-lg fade" id="scheduledTransferDetailsModal" role="dialog" aria-label="Scheduled Transfer Details Modal.">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 id="TransferConfirmationModalscheduledTransferDetailsModalHiddenTitle" className="offscreen-label" tabIndex="0" aria-label="model opened">model opened</h5>
                            <button type="button" id="scheduledTransferModalDismissXButton" className="close" data-dismiss="modal" aria-label="Close" onClick={ScheduledTransfersReactModule.handleDetailsModalClosed} tabIndex="0"><span aria-hidden="true">&times;</span></button>
                            <h4 id="ReactNativeScheduledTransferDetailsModalH4Heading" className="modal-title" tabIndex="0">
                                {ScheduledTransfersReactObject.Settings.Literals.scheduledTransferDetailModalHeaderText}
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="modal-print-area">
                                <div id="ScheduledtransferModalProgressDiv" className="spinner-container" style={{ display: "none" }}>
                                    <img src={ScheduledTransfersReactObject.Settings.spinnerFilename} alt="Processing…" />&nbsp;Processing...
									</div>

                                <div id="ScheduledtransferModalValidationDiv" className="alert alert-danger" style={{ display: 'none' }}>
                                    Please correct the following errors:
									</div>

                                <div id="ScheduledtransferModalSuccessDiv" className="alert alert-success" style={{ display: "none" }}>
                                    {/* Success message will be rendered here */}
                                </div>

                                <div id="ScheduledtransferModalFailedDiv" className="alert alert-danger" style={{ display: "none" }}>
                                    {/* Failure/Error message will be rendered here */}
                                </div>

                                <div id="scheduledTransferDescriptionDiv">
                                    {/* Transfer details will be rendered here */}
                                </div>

                                <dl id="scheduledTransferDetailsDefinitionList" className="dl-horizontal">
                                    <dt>
                                        Description
										</dt>
                                    <dd id="scheduledTransferDescriptionDot">
                                        {/* Transfer description will be rendered here */}
                                    </dd>

                                    <dt>
                                        Amount
										</dt>
                                    <dd id="scheduledTransferAmountDot">
                                        {/* Transfer amount will be rendered here */}
                                    </dd>

                                    <dt>
                                        Status
										</dt>
                                    <dd id="scheduledTransferStatusDot">
                                        {/* Transfer status will be rendered here */}
                                    </dd>
                                </dl>
                            </div>

                            {/* EDIT SECTION */}
                            {/* EDIT SECTION */}
                            {/* EDIT SECTION */}

                            <div id="ScheduledTransferModalEditTransferDiv" style={{ display: 'none' }}>
                                {/* TRANSFER DESCRIPTION */}
                                <div className="form-container">
                                    <div className="sub-div div-1">
                                        <label className="form-label" htmlFor="ScheduledTransfersModalTransferDescriptionTextbox">{TransfersReactObject.Settings.Literals.labelScheduledTransferDescriptionText}</label>
                                    </div>

                                    <div className="sub-div div-2">
                                        <input type="text" id="ScheduledTransfersModalTransferDescriptionTextbox" name="ScheduledTransfersModalTransferDescriptionTextbox" aria-required="true" tabIndex="2" />
                                    </div>
                                </div>

                                {/* "AMOUNT" ITEMS */}
                                <div className="form-container">
                                    <div className="sub-div div-1">
                                        <label className="form-label" htmlFor="scheduledTransferModalAmountValidationDiv">{TransfersReactObject.Settings.Literals.labelAmountText}</label>
                                    </div>

                                    <div className="sub-div div-2 input-group">
                                        <div id="scheduledTransferModalAmountValidationDiv" style={{ display: "inline-block" }}>
                                            <div className="input-group-addon">$</div><input className="addon-input" id="ScheduledTransfersModalTransferAmountTextbox" name="ScheduledTransfersModalTransferAmountTextbox" type="text" tabIndex="3"
                                                onKeyUp={TransfersReactModule.validateAmountKeyEntries} onBlur={TransfersReactModule.formatTransferAmountField} />
                                        </div>
                                    </div>
                                </div>

                                {/* ACTIVE/INACTIVE */}
                                <div className="form-container">
                                    <div className="sub-div div-1">
                                        {/* SPACE */}
                                    </div>

                                    <div className="sub-div div-2 input-group">
                                        <div id="scheduledTransferModalActiveValidationDiv" style={{ display: "inline-block" }}>
                                            <input type="checkbox" defaultChecked="true" id="ScheduledTransfersModalTransferActiveTextbox" name="ScheduledTransfersModalTransferActiveTextbox" tabIndex="4" />&nbsp;<label htmlFor="ScheduledTransfersModalTransferActiveTextbox" style={{ fontWeight: "normal" }}>Active</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="scheduledTransferModalFooter" className="modal-footer">
                                <input id="scheduledTransferModalEditTransferButton" type="button" className="btn btn-primary pull-left" value="Edit" tabIndex="5" onClick={() => ScheduledTransfersReactModule.setEditTransferMode()} />
                                <input id="scheduledTransferModalDeleteTransferButton" type="button" className="btn btn-danger pull-left" value="Deactivate" tabIndex="6" onClick={() => ScheduledTransfersReactModule.deleteTransferConfirm()} />
                                <input id="scheduledTransferModalActivateTransferButton" type="button" className="btn btn-danger pull-left" value="Activate" tabIndex="6" onClick={() => ScheduledTransfersReactModule.activateTransferConfirm()} style={{ display: "none" }} />
                                <input id="scheduledTransferModalSaveTransferButton" type="button" className="btn btn-primary pull-left" value="Save Changes" tabIndex="5" onClick={() => ScheduledTransfersReactModule.validateScheduledTransferEdit()} style={{ display: "none" }} />
                                <input id="scheduledTransferModalCancelEditTransferButton" type="button" className="btn btn-default pull-left" value="Cancel" tabIndex="6" onClick={() => ScheduledTransfersReactModule.cancelSetEditTransferMode()} style={{ display: "none" }} />
                                <input id="scheduledTransferModalDismissButton" type="button" className="btn btn-default pull-right" data-dismiss="modal" value="Ok" tabIndex="7" onClick={ScheduledTransfersReactModule.handleDetailsModalClosed} />
                                <input id="scheduledTransferModalDismissAfterEditOrDeleteButton" type="button" className="btn btn-default pull-right" data-dismiss="modal" tabIndex="8" value="Dismiss" onClick={ScheduledTransfersReactModule.refreshScheduleTransferModule} style={{ display: "none" }} />
                            </div>

                            <div className="modal-items-presentation-container">
                                {this.state.currentScheduledEvent !== null && this.state.currentScheduledEvent.transferHistory.length > 0 ? <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>Recent History Items</div> : null}

                                <div>
                                    {this.state.currentScheduledEvent !== null && this.state.currentScheduledEvent.transferHistory.length > 0 ? this.state.currentScheduledEvent.transferHistory.map(ScheduledTransfersReactModule.mapHistoryItems) : "There are no items in history"}
                                </div>
                            </div>

                            <form id="RestorePaymentsCheckboxForm" style={{ clear: 'both' }}>
                                <div className="modal-items-presentation-container">
                                    {this.state.occuranceDatesNotActive !== null && this.state.occuranceDatesNotActive.length > 0 ? <div style={{ clear: 'both', fontWeight: 'bold', marginBottom: '3px' }}>Exemption Dates</div> : null}

                                    <div style={{ clear: 'both' }}>{this.state.occuranceDatesNotActive !== null && this.state.occuranceDatesNotActive.length > 0 ? this.state.occuranceDatesNotActive.map(ScheduledTransfersReactModule.mapExemptionPaymentDates) : "There are no exemptions scheduled"}
                                    </div>
                                </div>

                                {this.state.occuranceDatesNotActive !== null && this.state.occuranceDatesNotActive.length > 0 ? <div style={{ clear: 'both' }}><input id="scheduledTransferModalRestorePaymentButton" type="button" className="btn btn-sm btn-primary pull-right" style={{ marginTop: "4px", marginBottom: "8px" }} value="Restore Selected Payments" onClick={() => ScheduledTransfersReactModule.processRestorePaymentForm()} tabIndex="0" /></div> : null}

                            </form>

                            <form id="SkipPaymentsCheckboxForm">
                                <div className="modal-items-presentation-container" style={{ clear: 'both' }}>
                                    {this.state.occuranceDatesActive !== null && this.state.occuranceDatesActive.length > 0 ? <div style={{ clear: 'both', fontWeight: 'bold', marginBottom: '3px' }}>Upcoming Payment Dates</div> : null}

                                    <div style={{ clear: 'both' }}>
                                        {this.state.occuranceDatesActive !== null && this.state.occuranceDatesActive.length > 0 ? this.state.occuranceDatesActive.map(ScheduledTransfersReactModule.mapUpcomingPaymentDates) : "There are no upcoming payments"}
                                    </div>
                                </div>

                                {this.state.occuranceDatesActive !== null && this.state.occuranceDatesActive.length > 0 ? <div style={{ clear: 'both' }}><input id="scheduledTransferModalSkipPaymentButton" type="button" className="btn btn-sm btn-primary pull-right" style={{ marginTop: "4px", marginBottom: "4px" }} value="Skip Selected Payments" onClick={() => ScheduledTransfersReactModule.processSkipPaymentForm()} tabIndex="0" /></div> : null}

                            </form>

                            <div id="ScheduledtransferModalDateExceptionSuccessDiv" className="alert alert-success" style={{ display: "none" }} tabIndex="0">
                                Your changes have been saved.
								</div>

                            <div id="ScheduledtransferModalDateExceptionFailedDiv" className="alert alert-danger" style={{ display: "none" }} tabIndex="0">
                                Sorry, there was an error, please try again later.
								</div>

                            <div style={{ clear: "both", width: "100%", height: "4px" }}>
                                {/* SPACE */}
                            </div>

                            <input id="scheduledTransferModalRefreshDateExemptionButton" type="button" className="btn btn-primary pull-right" value="Refresh" tabIndex="9" onClick={ScheduledTransfersReactModule.refreshExemptionDates} style={{ display: "none", marginLeft: '8px' }} />

                            <input id="scheduledTransferModalDismissAfterDateExemptionButton" type="button" className="btn btn-default pull-right" data-dismiss="modal" value="Dismiss" tabIndex="10" onClick={ScheduledTransfersReactModule.refreshScheduleTransferModule} style={{ display: "none" }} />

                            <div id="scheduledTransferModalFooter" style={{ clear: "both" }}>
                                {/* SPACE */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            this.modalTarget
        )
    };

    render() {
        return <noscript></noscript>;
    }
};




// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================




ReactDOM.render(
    <ScheduledTransfersArea />, document.getElementById('ScheduledTransfersReactContainer')
);
