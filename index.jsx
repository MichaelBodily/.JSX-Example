// Transfers and Scheduled Transfers JSX file
//
//
//
//
//
//
//
// TRANSFERS REACT MODULE NAMESPACE FOR HELPER FUNCTIONS:


const TransfersReactModule = (function () {
    // local vars:
    var _indexPageTimer = null;
    var _memberAccounts;
    var _feeAccounts;
    var _validTransferAccounts;
    var _selectedFromAccount;
    var _selectedToAccount;
    var _selectedFeeAccount;
    var _buildShareFromOptGroup;
    var _buildShareToOptGroup;
    var _buildLoanFromOptGroup;
    var _buildLoanToOptGroup;
    var _buildCrossAccountToOptGroup;
    var _buildHouseholdingShareFromOptGroup;
    var _buildHouseholdingShareToOptGroup;
    var _buildHouseholdingLoanFromOptGroup;
    var _buildHouseholdingLoanToOptGroup;
    var _buildHouseholdingCardToOptGroup;
    var _buildLinkedAccountFromOptGroup;
    var _buildLinkedAccountToOptGroup;
    var _buildCardToOptGroup;
    var _scheduledFrequencyEnum = {
        ONE_TIME: "0",
        DAILY: "1",
        WEEKLY: "2",
        BI_WEEKLY: "3",
        TWICE_MONTHLY: "4",
        MONTHLY: "5",
        YEARLY: "6"
    };
    var _selectedFromAccountIsInternalCreditCard;

    // additional payment options 'group' settings:
    var _additionalTransferOptionsAreVisible;
    var _additionalToPrincipalShouldBeOpen = false;
    var _principalOnlyShouldBeOpen = false;
    var _iraContributionYearShouldBeOpen = false;


    // Scheduled Transfers Section:
    const _scheduledTransfers = () => {
        if (TransfersReactObject.Settings.transferConfiguration.AllowScheduledTransfers === true) {
            return (
                <div id="ScheduledTransfersSectionDiv" style={{ display: TransfersReactObject.Settings.groupAdditionalTransferOptions ? "none" : "block" }}>
                    <div className="form-container">
                        <div className="sub-div div-1">
                            {/* space */}
                        </div>

                        <div className="sub-div div-2">
                            <input id="ScheduledTransferCheckbox" name="ScheduledTransferCheckbox" type="checkbox" onChange={(e) => TransfersReactModule.toggleScheduledTransferSection(e)}
                                onKeyPress={(e) => TransfersReactModule.handleScheduledTransferSectionCheckboxKeyPress(e)} tabIndex="0" />
                            &nbsp;&nbsp;<label htmlFor="ScheduledTransferCheckbox">{TransfersReactObject.Settings.Literals.labelScheduleForLaterDateText}</label>
                        </div>
                    </div>

                    <div id="ScheduledTransferSection" style={{ display: 'none' }}>
                        <div className="form-container">
                            <div className="sub-div div-1">
                                <span className="form-label">{TransfersReactObject.Settings.Literals.labelScheduledTransferDescriptionText}</span>
                            </div>

                            <div className="sub-div div-2">
                                <input type="text" id="ScheduledTransferDescriptionTextbox" name="ScheduledTransferDescriptionTextbox" placeholder="Enter Description" aria-label="enter description" tabIndex="0" />
                            </div>
                        </div>

                        <div className="form-container">
                            <div className="sub-div div-1">
                                <span className="form-label">{TransfersReactObject.Settings.Literals.labelFrequencyText}</span>
                            </div>

                            <div className="sub-div div-2">
                                <select id="ScheduledTransferFrequencySelect" className="form-control frequency-select" defaultValue="none"
                                    onChange={(e) => TransfersReactModule.changeScheduledTransferFrequencySubSections(e)} aria-label="Select frequency" aria-required="true">
                                    <option value="none">-- Select --</option>
                                    <option value="0">One Time Occurrence</option>
                                    <option value="1">Daily</option>
                                    <option value="2">Weekly</option>
                                    <option value="4">Twice Monthly</option>
                                    <option value="5">Monthly</option>
                                    <option value="6">Yearly</option>
                                </select>
                            </div>
                        </div>


                        {/* BEGINNING DATE PICKER */}
                        <div className="form-container">
                            <div className="sub-div div-1">
                                <div id="AriaDatePickerDescriptionHiddenDiv" className="offscreen-form-label" aria-hidden="true">Activating this control will open a date picker. Use the control plus arrow keys to select a date in the date picker then tap the return key to set it.</div>
                                <label className="form-label" htmlFor="ScheduledTransferBeginningDateTextbox">{TransfersReactObject.Settings.Literals.labelBeginningDateText}</label>
                            </div>

                            <div className="sub-div div-2">
                                <input type="text" id="ScheduledTransferBeginningDateTextbox" name="ScheduledTransferBeginningDateTextbox" placeholder="mm/dd/yyyy 0:00 am/pm" aria-required="true" aria-describedby="AriaDatePickerDescriptionHiddenDiv" tabIndex="0" />
                            </div>
                        </div>

                        <div id="CustomStartTimeInstructionsDiv" style={{ display: 'none' }}>
                            <div className="form-container">
                                <div className="sub-div div-1">
                                    {/* SPACE */}
                                </div>

                                <div className="sub-div div-2">
                                    {TransfersReactObject.Settings.Literals.customStartTimeInstructionsText}
                                </div>
                            </div>
                        </div>

                        <div id="FixedStartTimeInstructionsDiv" style={{ display: 'none' }}>
                            <div className="form-container">
                                <div className="sub-div div-1">
                                    {/* SPACE */}
                                </div>

                                <div id="FixedStartTimeInstructions" className="sub-div div-2">
                                    {TransfersReactObject.Settings.Literals.fixedStartTimeInstructionsText}
                                </div>
                            </div>
                        </div>

                        {/* DAILY */}
                        <div id="ScheduledTransferDailySection" style={{ display: 'none' }}>
                            <div className="form-container">
                                <div className="sub-div div-1">
                                    <span className="form-label">{TransfersReactObject.Settings.Literals.labelDailyPaymentsOccurText}</span>
                                </div>

                                <div className="sub-div div-2">
                                    <div>
                                        <input type="radio" id="ScheduledTransferDailyXdaysRadio" name="ScheduledTransferDailyRadio" value="EveryXdays" aria-label="every how many days" tabIndex="0" />&nbsp;Every&nbsp;
										<input type="text" id="ScheduledTransferBeginningTextbox" name="ScheduledTransferBeginningTextbox" maxLength={1} placeholder="2" aria-label="occurrence" tabIndex="0" />&nbsp;day(s)
									</div>

                                    <div>
                                        <input type="radio" id="ScheduledTransferDailyWeekdayRadio" name="ScheduledTransferDailyRadio" value="EveryWeekday" aria-label="every weekday" tabIndex="0" />&nbsp;Every weekday
									</div>
                                </div>
                            </div>
                        </div>

                        {/* WEEKLY */}
                        <div id="ScheduledTransferWeeklySection" style={{ display: 'none' }}>
                            <div className="form-container">
                                <div className="sub-div div-1">
                                    <label className="form-label" htmlFor="ScheduledTransferWeeklyTextbox">{TransfersReactObject.Settings.Literals.labelWeeklyPaymentsOccurText}</label>
                                </div>

                                <div className="sub-div div-2">
                                    <div>
                                        Every&nbsp;<input type="text" id="ScheduledTransferWeeklyTextbox" name="ScheduledTransferWeeklyTextbox" placeholder="1" maxLength={2} tabIndex="0" />&nbsp;week(s) on
									</div>

                                    <div id="weeklyOccuranceDiv">
                                        <input type="checkbox" id="ScheduledTransferWeeklyMondayCheckbox" name="ScheduledTransferWeeklyMondayCheckbox" value="WeeklyOnMonday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferWeeklyMondayCheckbox">Monday</label>&nbsp;&nbsp;&nbsp;
										<input type="checkbox" id="ScheduledTransferWeeklyTuesdayCheckbox" name="ScheduledTransferWeeklyTuesdayCheckbox" value="WeeklyOnTuesday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferWeeklyTuesdayCheckbox">Tuesday</label>&nbsp;&nbsp;&nbsp;
										<input type="checkbox" id="ScheduledTransferWeeklyWednesdayCheckbox" name="ScheduledTransferWeeklyWednesdayCheckbox" value="WeeklyOnWednesday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferWeeklyWednesdayCheckbox">Wednesday</label><br />
                                        <input type="checkbox" id="ScheduledTransferWeeklyThursdayCheckbox" name="ScheduledTransferWeeklyThursdayCheckbox" value="WeeklyOnThursday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferWeeklyThursdayCheckbox">Thursday</label>&nbsp;&nbsp;&nbsp;
										<input type="checkbox" id="ScheduledTransferWeeklyFridayCheckbox" name="ScheduledTransferWeeklyFridayCheckbox" value="WeeklyOnFriday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferWeeklyFridayCheckbox">Friday</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TWICE MONTHLY */}
                        <div id="ScheduledTransferTwiceMonthlySection" style={{ display: 'none' }}>
                            <div className="form-container">
                                <div className="sub-div div-1">
                                    <span className="form-label">{TransfersReactObject.Settings.Literals.labelTwiceMonthlyPaymentsOccurText}</span>
                                </div>

                                <div className="sub-div div-2">
                                    <div>
                                        <input type="radio" id="ScheduledTransferTwiceMonthlyChosenDaysRadio" name="ScheduledTransferTwiceMonthlyRadio" value="ChosenDays" aria-label="On day" tabIndex="0" />&nbsp;On day&nbsp;
										<input type="text" id="ScheduledTransferTwiceMonthlyBeginningDayTextbox" name="ScheduledTransferTwiceMonthlyBeginningDayTextbox" placeholder="1" maxLength={2} aria-label="beginning day" tabIndex="0" />&nbsp;and&nbsp;day&nbsp;
										<input type="text" id="ScheduledTransferTwiceMonthlyConcludingDayTextbox" name="ScheduledTransferTwiceMonthlyConcludingDayTextbox" placeholder="15" maxLength={2} aria-label="concluding day" tabIndex="0" />&nbsp;of&nbsp;the&nbsp;month<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every&nbsp;
										<input type="text" id="ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox" name="ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox" placeholder="1" maxLength={2} aria-label="monthly interval" tabIndex="0" />&nbsp;month(s)
									</div>

                                    <div>
                                        <input type="radio" id="ScheduledTransferTwiceMonthly15thAndLastDayRadio" name="ScheduledTransferTwiceMonthlyRadio" value="15thAndLastDay" aria-label="On day 15 and the last day of the month" tabIndex="0" />&nbsp;On day 15 and the last day of the month<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every&nbsp;
										<input type="text" id="ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox" name="ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox" placeholder="1" aria-label="enter day" tabIndex="0" />&nbsp;month(s)
									</div>
                                </div>
                            </div>
                        </div>

                        {/* MONTHLY */}
                        <div id="ScheduledTransferMonthlySection" style={{ display: 'none' }}>
                            <div id="MonthlyOccurrenceDisabledNoticeDiv" className="form-container" style={{ display: 'none' }}>
                                <div className="sub-div div-1">
                                    {/* space */}
                                </div>

                                <div className="sub-div div-2">
                                    {TransfersReactObject.Settings.Literals.monthlyBasisInstructionText}
                                </div>
                            </div>

                            <div id="MonthyOccurrenceOptionsDiv" className="form-container">
                                <div className="sub-div div-1">
                                    <span className="form-label">{TransfersReactObject.Settings.Literals.labelMonthlyPaymentsOccurText}</span>
                                </div>

                                <div className="sub-div div-2">
                                    <div>
                                        <input type="radio" id="ScheduledTransferMonthlyChosenDaysRadio" name="ScheduledTransferMonthlyRadio" value="ChosenDays" aria-label="chosen days" tabIndex="0" />&nbsp;On day&nbsp;
										<input type="text" id="ScheduledTransferMonthlyBeginningDayTextbox" name="ScheduledTransferMonthlyBeginningDayTextbox" placeholder="1" maxLength={2} aria-label="beginning day" tabIndex="0" />&nbsp;every&nbsp;
										<input type="text" id="ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox" name="ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox" placeholder="1" maxLength={2} aria-label="monthly interval" tabIndex="0" />&nbsp;month(s)
									</div>

                                    <div>
                                        <input type="radio" id="ScheduledTransferMonthlyLastDayRadio" name="ScheduledTransferMonthlyRadio" value="LastDay" aria-label="last day" tabIndex="0" />&nbsp;On the last day of the month&nbsp;every&nbsp;
										<input type="text" id="ScheduledTransferMonthlyLastDayTextbox" name="ScheduledTransferMonthlyLastDayTextbox" placeholder="1" maxLength={2} aria-label="last day" tabIndex="0" />&nbsp;month(s)
									</div>

                                    <div>
                                        <input type="radio" id="ScheduledTransferMonthlyMonthNthRadio" name="ScheduledTransferMonthlyRadio" value="MonthNth" aria-label="Monthly" tabIndex="0" />&nbsp;On the&nbsp;
										<select id="ScheduledTransferMonthlyMonthlyNthEnumerationSelect" className="bill-pay-select" aria-label="Select occurrence">
                                            <option value="1">1st</option>
                                            <option value="2">2nd</option>
                                            <option value="3">3rd</option>
                                            <option value="4">4th</option>
                                            <option value="5">5th</option>
                                        </select>
                                    </div>

                                    <div className="radio-bump-left">
                                        <div id="monthlyWeekdayOccuranceDiv">
                                            <input type="checkbox" id="ScheduledTransferMonthlyMondayCheckbox" name="ScheduledTransferMonthlyMondayCheckbox" value="MonthlyOnMonday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferMonthlyMondayCheckbox">Monday</label>&nbsp;&nbsp;&nbsp;
											<input type="checkbox" id="ScheduledTransferMonthlyTuesdayCheckbox" name="ScheduledTransferMonthlyTuesdayCheckbox" value="MonthlyOnTuesday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferMonthlyTuesdayCheckbox">Tuesday</label>&nbsp;&nbsp;&nbsp;
											<input type="checkbox" id="ScheduledTransferMonthlyWednesdayCheckbox" name="ScheduledTransferMonthlyWednesdayCheckbox" value="MonthlyOnWednesday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferMonthlyWednesdayCheckbox">Wednesday</label><br />
                                            <input type="checkbox" id="ScheduledTransferMonthlyThursdayCheckbox" name="ScheduledTransferMonthlyThursdayCheckbox" value="MonthlyOnThursday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferMonthlyThursdayCheckbox">Thursday</label>&nbsp;&nbsp;&nbsp;
											<input type="checkbox" id="ScheduledTransferMonthlyFridayCheckbox" name="ScheduledTransferMonthlyFridayCheckbox" value="MonthlyOnFriday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferMonthlyFridayCheckbox">Friday</label>
                                        </div>
                                        <div>
                                            every&nbsp;
											<input type="text" id="ScheduledTransferMonthlyMonthlyNthTextbox" name="ScheduledTransferMonthlyMonthlyNthTextbox" placeholder="1" maxLength={2} aria-label="monthy occurrence" tabIndex="0" />&nbsp;month(s)
										</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* YEARLY */}
                        <div id="ScheduledTransferYearlySection" style={{ display: 'none' }}>
                            <div className="form-container">
                                <div className="sub-div div-1">
                                    <span className="form-label">{TransfersReactObject.Settings.Literals.labelYearlyPaymentsOccurText}</span>
                                </div>

                                <div className="sub-div div-2">
                                    <div>
                                        <input type="radio" id="ScheduledTransferYearlySelectMonthRadio" name="ScheduledTransferYearlyRadio" value="SelectedMonth" aria-label="Select Month" tabIndex="0" />&nbsp;Every&nbsp;
										<select id="ScheduledTransferYearlyMonthSelect" className="bill-pay-select" aria-label="Select month">
                                            <option value="1">January</option>
                                            <option value="2">February</option>
                                            <option value="3">March</option>
                                            <option value="4">April</option>
                                            <option value="5">May</option>
                                            <option value="6">June</option>
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                        </select>&nbsp;

										<input type="text" id="ScheduledTransferYearlyDayTextbox" name="ScheduledTransferYearlyDayTextbox" placeholder="31" aria-label="enter yearly day" tabIndex="0" />
                                    </div>

                                    <div>
                                        <input type="radio" id="ScheduledTransferYearlyDayOfMonthRadio" name="ScheduledTransferYearlyRadio" value="SelectedDayOfMonth" aria-label="Select day of Month" tabIndex="0" />&nbsp;On&nbsp;the&nbsp;
										<select id="ScheduledTransferYearlyNumberEnumerationSelect" className="bill-pay-select" aria-label="Select occurrence">
                                            <option value="1">1st</option>
                                            <option value="2">2nd</option>
                                            <option value="3">3rd</option>
                                            <option value="4">4th</option>
                                            <option value="5">last</option>
                                        </select>&nbsp;
										<select id="ScheduledTransferYearlyWeekdayEnumerationSelect" className="bill-pay-select" aria-label="Select day">
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Thursday">Thursday</option>
                                            <option value="Friday">Friday</option>
                                        </select>&nbsp;of&nbsp;
										<select id="ScheduledTransferYearlyMonth2Select" className="bill-pay-select" aria-label="Select Month">
                                            <option value="1">January</option>
                                            <option value="2">February</option>
                                            <option value="3">March</option>
                                            <option value="4">April</option>
                                            <option value="5">May</option>
                                            <option value="6">June</option>
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                        </select>&nbsp;
									</div>

                                    <div>
                                        <input type="radio" id="ScheduledTransferYearlyYearlyNthRadio" name="ScheduledTransferYearlyRadio" value="YearlyNth" aria-label="yearly occurrence" tabIndex="0" />&nbsp;On the&nbsp;
										<select id="ScheduledTransferYearlyNthEnumerationSelect" className="bill-pay-select" aria-label="Select occurrence">
                                            <option value="1">1st</option>
                                            <option value="2">2nd</option>
                                            <option value="3">3rd</option>
                                            <option value="4">4th</option>
                                            <option value="5">5th</option>
                                        </select>
                                    </div>

                                    <div className="radio-bump-left">
                                        <div id="yearlyWeekdayOccuranceDiv">
                                            <input type="checkbox" id="ScheduledTransferYearlyNthMondayCheckbox" name="ScheduledTransferYearlyNthMondayCheckbox" value="YearlyNthOnMonday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferYearlyNthMondayCheckbox">Monday</label>&nbsp;&nbsp;&nbsp;
											<input type="checkbox" id="ScheduledTransferYearlyNthTuesdayCheckbox" name="ScheduledTransferYearlyNthTuesdayCheckbox" value="YearlyNthOnTuesday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferYearlyNthTuesdayCheckbox">Tuesday</label>&nbsp;&nbsp;&nbsp;
											<input type="checkbox" id="ScheduledTransferYearlyNthWednesdayCheckbox" name="ScheduledTransferYearlyNthWednesdayCheckbox" value="YearlyNthOnWednesday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferYearlyNthWednesdayCheckbox">Wednesday</label><br />
                                            <input type="checkbox" id="ScheduledTransferYearlyNthThursdayCheckbox" name="ScheduledTransferYearlyNthThursdayCheckbox" value="YearlyNthOnThursday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferYearlyNthThursdayCheckbox">Thursday</label>&nbsp;&nbsp;&nbsp;
											<input type="checkbox" id="ScheduledTransferYearlyNthFridayCheckbox" name="ScheduledTransferYearlyNthFridayCheckbox" value="YearlyNthOnFriday" tabIndex="0" />&nbsp;<label htmlFor="ScheduledTransferYearlyNthFridayCheckbox">Friday</label><br />
                                        </div>

                                        <div>
                                            of&nbsp;<select id="ScheduledTransferYearlyNthMonthSelect" className="bill-pay-select" aria-label="Select month">
                                                <option value="1">January</option>
                                                <option value="2">February</option>
                                                <option value="3">March</option>
                                                <option value="4">April</option>
                                                <option value="5">May</option>
                                                <option value="6">June</option>
                                                <option value="7">July</option>
                                                <option value="8">August</option>
                                                <option value="9">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </select>&nbsp;every&nbsp;
											<input type="text" id="ScheduledTransferYearlyNthTextbox" name="ScheduledTransferYearlyNthTextbox" placeholder="1" aria-label="yearly occurrence" tabIndex="0" />&nbsp;year(s)
										</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* END DATE */}
                        <div id="ScheduledTransferEndDateSection" style={{ display: 'none' }}>
                            <div className="form-container">
                                <div className="sub-div div-1">
                                    <span className="form-label">{TransfersReactObject.Settings.Literals.labelEndingDateText}</span>
                                </div>

                                <div className="sub-div div-2">
                                    <div>
                                        <input type="radio" id="ScheduledTransferEndingInYearsRadio" name="ScheduledTransferEndingRadio" value="OneYear" aria-label="One year" tabIndex="0" />&nbsp;End&nbsp;in&nbsp;
										<input type="text" id="ScheduledTransferEndingYearsTextbox" name="ScheduledTransferEndingYearsTextbox" placeholder="1" maxLength={2} aria-label="ending year" tabIndex="0" />&nbsp;year(s)
									</div>



                                    <div>
                                        <input type="radio" id="ScheduledTransferEndingXoccurencesRadio" name="ScheduledTransferEndingRadio" value="Xoccurences" aria-label="yearly occurrence" tabIndex="0" />&nbsp;End after&nbsp;
										<input type="text" id="ScheduledTransferEndingOccurencesTextbox" name="ScheduledTransferEndingOccurencesTextbox" placeholder="5" maxLength={2} aria-label="ending occurrence" tabIndex="0" />&nbsp;occurences
									</div>

                                    <div>
                                        <input type="radio" id="ScheduledTransferEndingByDateRadio" name="ScheduledTransferEndingRadio" value="ByDate" aria-label="by date" tabIndex="0" />&nbsp;End&nbsp;on&nbsp;
										<input type="text" id="ScheduledTransferEndingDateTextbox" name="ScheduledTransferEndingDateTextbox" placeholder="mm/dd/yyyy" aria-label="ending date" aria-describedby="AriaDatePickerDescriptionHiddenDiv" tabIndex="0" />
                                    </div>

                                    <div>
                                        <input type="radio" id="ScheduledTransferEndingNoEndRadio" name="ScheduledTransferEndingRadio" value="NoEndDate" aria-label="no end date" tabIndex="0" />&nbsp;No End Date
									</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
    }



    // reset the transfer form:
    const _resetTransfersForm = (e) => {
        //console.log("got here: resetTransfersForm");

        document.getElementById("TransfersFromSelect").style.outline = "none";
        document.getElementById("TransfersToSelect").style.outline = "none";
        document.getElementById("FeeAccountSelect").style.outline = "none";
        document.getElementById("TransferAmountTextbox").parentNode.style.outline = "none";

        document.getElementById("TransfersFromSelect").value = "none";
        document.getElementById("TransfersToSelect").value = "none";
        document.getElementById("FeeAccountSelect").value = "none";
        document.getElementById("TransferAmountTextbox").value = "";
        document.getElementById("TransferDescriptionTextbox").value = "";

        $("#FeeSelectDiv").hide();

        $("#AdditionalToPrincipalDiv").hide();
        document.getElementById("AdditionalToPrincipalCheckbox").checked = false;

        $("#PrincipalOnlyDiv").hide();
        document.getElementById("PrincipalOnlyCheckbox").checked = false;

        $("#IraContributionYearDiv").hide();
        document.getElementById("IraContributionYearSelect").value = "none";

        $("#RegdDetailsDiv").hide();
        $("#TransferFromLimitsDiv").hide();
        $("#Hours24TransferFromLimitsDiv").hide();
        $("#FeeFromDiv").hide();
        $("#FreeRemainingFromDiv").hide();

        $("#TransferToLimitsDiv").hide();
        $("#Hours24TransferToLimitsDiv").hide();
        $("#FeeToDiv").hide();
        $("#FreeRemainingToDiv").hide();

        document.getElementById("ScheduledTransferDescriptionTextbox").value = "";
        document.getElementById("ScheduledTransferFrequencySelect").value = "none";
        document.getElementById("ScheduledTransferDailyXdaysRadio").checked = false;
        document.getElementById("ScheduledTransferBeginningTextbox").value = "";
        document.getElementById("ScheduledTransferWeeklyTextbox").value = "";
        document.getElementById("ScheduledTransferWeeklyMondayCheckbox").parentNode.style.outline = "";
        document.getElementById("ScheduledTransferTwiceMonthlyChosenDaysRadio").checked = false;
        document.getElementById("ScheduledTransferTwiceMonthlyBeginningDayTextbox").value = "";
        document.getElementById("ScheduledTransferTwiceMonthlyConcludingDayTextbox").value = "";
        document.getElementById("ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox").value = "";
        document.getElementById("ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox").value = "";
        document.getElementById("ScheduledTransferMonthlyMonthNthRadio").checked = false;
        document.getElementById("ScheduledTransferMonthlyBeginningDayTextbox").value = "";
        document.getElementById("ScheduledTransferMonthlyMonthlyNthTextbox").value = "";
        document.getElementById("ScheduledTransferMonthlyLastDayTextbox").value = "";
        document.getElementById("ScheduledTransferMonthlyMondayCheckbox").checked = false;
        document.getElementById("ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox").value = "";
        document.getElementById("ScheduledTransferYearlySelectMonthRadio").checked = false;
        document.getElementById("ScheduledTransferYearlyDayTextbox").value = "";
        document.getElementById("ScheduledTransferYearlyNthMondayCheckbox").parentNode.style.outline = "none";
        document.getElementById("ScheduledTransferYearlyNthTextbox").value = "";
        document.getElementById("ScheduledTransferEndingInYearsRadio").checked = false;
        document.getElementById("ScheduledTransferEndingYearsTextbox").value = "";
        document.getElementById("ScheduledTransferEndingOccurencesTextbox").value = "";
        document.getElementById("ScheduledTransferEndingDateTextbox").value = "";
        document.getElementById("ScheduledTransferBeginningDateTextbox").value = "";
        document.getElementById("ScheduledTransferEndingDateTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferBeginningDateTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferEndingXoccurencesRadio").checked = false;

        // finally, uncheck scheduled transfers checkbox and hide the scheduled transfers section


        if (TransfersReactObject.Settings.tieredAccessTransfersAccess.toLocaleLowerCase() !== "scheduledonly") {
            document.getElementById("ScheduledTransferCheckbox").checked = false;
            $("#ScheduledTransferSection").slideUp();
        }

        $("#TransfersValidationDiv").hide();
        TransfersReactModule.resetRecurringSectionValidation();
    }


    // reset the transfer form from key press if the key was the ENTER key (ADA Compliance):
    const _resetTransfersFormFromKeyPress = (e) => {
        var currTarget = e.target;

        if (e.key === "Enter") {
            _resetTransfersForm(e)
        }
    }


    // get the eligible payment days from the controller. The lead days comes from a configuration setting. If we don't have it, set it to a 3 day default.
    const _loadMember = () => {
        var apiUrl = HomeBanking.BASE_URL + "api/accounts/get-accounts";

        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function (data) {
                // console.log("loadMember reply data: ", data);

                _memberAccounts = TransfersReactModule.setMemberAccounts(data);
                TransfersReactModule.setFeeAccounts();      // sets _feeAccounts

                //TransfersMainComponent.updateMemberState();
                TransfersAreaComponent.updateMemberState();
                $("#TransfersLoadingDataDiv").slideUp();
                $(".scheduled-tab-content").slideDown();

                // check query string items for pre-population of amount, 'to' account, or if scheduled or not
                TransfersReactModule.calculateQueryStringItems();

                // dashboard only: if restricted to 'one time only' then shut off other options
                if (TransfersReactObject.Settings.restrictScheduleToOneTimeOnly) {
                    TransfersReactModule.restrictTransferFrequencyToOneTime();
                }

                // Tiered access settings:
                if (!HomeBanking.Utilities.String.IsNullOrEmpty(TransfersReactObject.Settings.tieredAccessTransfersAccess)) {
                    //console.log("Got here. TransfersReactObject.Settings.tieredAccessTransfersAccess = ", TransfersReactObject.Settings.tieredAccessTransfersAccess);

                    if (TransfersReactObject.Settings.tieredAccessTransfersAccess.toLocaleLowerCase() === "transfersonly") {
                        console.log("Got here. TransfersReactObject.Settings.tieredAccessTransfersAccess = ", TransfersReactObject.Settings.tieredAccessTransfersAccess);

                        $("#ScheduledTransfersSectionDiv").slideUp();
                    } else if (TransfersReactObject.Settings.tieredAccessTransfersAccess.toLocaleLowerCase() === "scheduledonly") {
                        console.log("Got here. TransfersReactObject.Settings.tieredAccessTransfersAccess = ", TransfersReactObject.Settings.tieredAccessTransfersAccess);

                        document.getElementById("ScheduledTransferCheckbox").click();
                        $("#ScheduledTransferCheckbox").prop("disabled", true);
                    }
                }
            },
            error: function (xhr, err) {
                // nothing... fail silently
            }
        });
    }


    // Setup client-side member accounts with id so we can get them later
    const _setMemberAccounts = (data) => {
        //console.log("data  : ", data);

        var counter = 1;

        // SHARES - 'from' or 'to'
        if (data.shares.length > 0) {
            for (var i = 0; i < data.shares.length; i++) {
                data.shares[i].id = counter;
                data.shares[i].slType = "S";
                data.shares[i].longDescription = data.shares[i].description;
                data.shares[i].isPreSelectedToAccount = TransfersReactObject.Settings.QueryString.toAccount &&
                    TransfersReactModule.preSelectedToAccountMatches(data.shares[i], "S",
                        TransfersReactObject.Settings.QueryString.toAccount.type,
                        TransfersReactObject.Settings.QueryString.toAccount.identifier,
                        TransfersReactObject.Settings.QueryString.toAccount.householdAccountId);
                counter++;

                if (data.shares[i].transferFrom) {
                    _buildShareFromOptGroup = true;
                }

                if (data.shares[i].transferTo) {
                    _buildShareToOptGroup = true;
                }
            }
        }

        // LOANS - 'from' or 'to'
        if (data.loans.length > 0) {
            for (var i = 0; i < data.loans.length; i++) {
                data.loans[i].id = counter;
                data.loans[i].slType = "L";
                data.loans[i].longDescription = data.loans[i].description;
                data.loans[i].isPreSelectedToAccount = TransfersReactObject.Settings.QueryString.toAccount &&
                    TransfersReactModule.preSelectedToAccountMatches(data.loans[i], "L",
                        TransfersReactObject.Settings.QueryString.toAccount.type,
                        TransfersReactObject.Settings.QueryString.toAccount.identifier,
                        TransfersReactObject.Settings.QueryString.toAccount.householdAccountId);
                counter++;

                if (data.loans[i].transferFrom) {
                    _buildLoanFromOptGroup = true;
                }

                if (data.loans[i].transferTo) {
                    _buildLoanToOptGroup = true;
                }
            }
        }

        // HOUSEHOLDING ITEMS:
        if (data.householdingAccounts.length > 0) {
            for (var j = 0; j < data.householdingAccounts.length; j++) {

                // HOUSEHOLDING SHARES - 'from' or 'to'
                if (data.householdingAccounts[j].shares.length > 0) {
                    for (var i = 0; i < data.householdingAccounts[j].shares.length; i++) {
                        data.householdingAccounts[j].shares[i].id = counter;
                        data.householdingAccounts[j].shares[i].slType = "S";
                        data.householdingAccounts[j].shares[i].longDescription = data.householdingAccounts[j].description + ": " + data.householdingAccounts[j].shares[i].description;
                        data.householdingAccounts[j].shares[i].isPreSelectedToAccount = TransfersReactObject.Settings.QueryString.toAccount &&
                            TransfersReactModule.preSelectedToAccountMatches(data.householdingAccounts[j].shares[i], "S",
                                TransfersReactObject.Settings.QueryString.toAccount.type,
                                TransfersReactObject.Settings.QueryString.toAccount.identifier,
                                TransfersReactObject.Settings.QueryString.toAccount.householdAccountId);
                        counter++;
                    }
                }

                // HOUSEHOLDING LOANS - 'from' or 'to'
                if (data.householdingAccounts[j].loans.length > 0) {
                    for (var i = 0; i < data.householdingAccounts[j].loans.length; i++) {
                        data.householdingAccounts[j].loans[i].id = counter;
                        data.householdingAccounts[j].loans[i].slType = "L";
                        data.householdingAccounts[j].loans[i].longDescription = data.householdingAccounts[j].description + ": " + data.householdingAccounts[j].loans[i].description;
                        data.householdingAccounts[j].loans[i].isPreSelectedToAccount = TransfersReactObject.Settings.QueryString.toAccount &&
                            TransfersReactModule.preSelectedToAccountMatches(data.householdingAccounts[j].loans[i], "L",
                                TransfersReactObject.Settings.QueryString.toAccount.type,
                                TransfersReactObject.Settings.QueryString.toAccount.identifier,
                                TransfersReactObject.Settings.QueryString.toAccount.householdAccountId);
                        counter++;

                        if (data.householdingAccounts[j].loans[i].transferFrom) {
                            _buildHouseholdingLoanFromOptGroup = true;
                        }

                        if (data.householdingAccounts[j].loans[i].transferTo) {
                            _buildHouseholdingLoanToOptGroup = true;
                        }
                    }
                }

                // HOUSEHOLDING CARDS -  'to' dropdown only
                if (data.householdingAccounts[j].cards.length > 0) {
                    for (var i = 0; i < data.householdingAccounts[j].cards.length; i++) {
                        data.householdingAccounts[j].cards[i].id = counter;
                        data.householdingAccounts[j].cards[i].slType = "CREDIT";
                        data.householdingAccounts[j].cards[i].longDescription = data.householdingAccounts[j].description + ": " + data.householdingAccounts[j].cards[i].cardDisplayNoAccount;
                        data.householdingAccounts[j].cards[i].isPreSelectedToAccount = TransfersReactObject.Settings.QueryString.toAccount &&
                            TransfersReactModule.preSelectedToAccountMatches(data.householdingAccounts[j].cards[i], "CREDIT",
                                TransfersReactObject.Settings.QueryString.toAccount.type,
                                TransfersReactObject.Settings.QueryString.toAccount.identifier,
                                TransfersReactObject.Settings.QueryString.toAccount.householdAccountId);
                        counter++;

                        if (data.householdingAccounts[j].cards[i].transferTo) {
                            _buildHouseholdingCardToOptGroup = true;
                        }
                    }
                }
            }
        }


        // LINKED ACCOUNTS - 'from' or 'to'
        if (data.linkedAccounts.length > 0) {
            for (var i = 0; i < data.linkedAccounts.length; i++) {
                data.linkedAccounts[i].id = counter;
                data.linkedAccounts[i].slType = "LINKED";
                data.linkedAccounts[i].longDescription = data.linkedAccounts[i].description;
                data.linkedAccounts[i].suffix = data.linkedAccounts[i].achID;
                data.linkedAccounts[i].isPreSelectedToAccount = TransfersReactObject.Settings.QueryString.toAccount &&
                    TransfersReactModule.preSelectedToAccountMatches(data.linkedAccounts[i], "LINKED",
                        TransfersReactObject.Settings.QueryString.toAccount.type,
                        TransfersReactObject.Settings.QueryString.toAccount.identifier,
                        TransfersReactObject.Settings.QueryString.toAccount.householdAccountId);
                counter++;

                if (data.linkedAccounts[i].transferFrom) {
                    _buildLinkedAccountFromOptGroup = true;
                }

                if (data.linkedAccounts[i].transferTo) {
                    _buildLinkedAccountToOptGroup = true;
                }
            }
        }

        // CARDS -  "to" dropdown only
        if (data.cards.length > 0) {
            for (var i = 0; i < data.cards.length; i++) {
                data.cards[i].id = counter;
                data.cards[i].slType = "CREDIT";
                data.cards[i].longDescription = data.cards[i].cardDisplay;
                data.cards[i].account = data.cards[i].cardNumber;
                data.cards[i].isPreSelectedToAccount = TransfersReactObject.Settings.QueryString.toAccount &&
                    TransfersReactModule.preSelectedToAccountMatches(data.cards[i], "CREDIT",
                        TransfersReactObject.Settings.QueryString.toAccount.type,
                        TransfersReactObject.Settings.QueryString.toAccount.identifier,
                        TransfersReactObject.Settings.QueryString.toAccount.householdAccountId);
                counter++;

                if (data.cards[i].transferTo) {
                    _buildCardToOptGroup = true;
                }
            }
        }

        // CROSS ACCOUNTS -  'to' dropdown only
        if (data.crossAccounts.length > 0) {
            for (var i = 0; i < data.crossAccounts.length; i++) {
                data.crossAccounts[i].id = counter;
                data.crossAccounts[i].slType = data.crossAccounts[i].subAccountType === "S" ? "S" : "L";   // these have a built in 'subAccountType' property which will be either "S" or "L"
                data.crossAccounts[i].isCrossAccount = true;
                data.crossAccounts[i].longDescription = data.crossAccounts[i].maskAccount + ": " + data.crossAccounts[i].description;
                counter++;

                if (data.crossAccounts[i].transferTo) {
                    _buildCrossAccountToOptGroup = true;
                }
            }
        }

        // console.log("_memberAccounts  : ", data);
        return data;
    }


    // Setup client-side member FEE accounts with id so we can get them later
    const _setFeeAccounts = () => {
        _feeAccounts = {};  // set to empty object

        _feeAccounts.shares = $.grep(_memberAccounts.shares, function (item) {
            return item.allowFeeCharge === true;
        });

        _feeAccounts.loans = $.grep(_memberAccounts.loans, function (item) {
            return item.allowFeeCharge === true;
        });

        // console.log("_feeAccounts: ", _feeAccounts);
    }


    // Calculate 'FROM' accounts for select drop-down list
    const _calculateFromAccountSelect = () => {
        return (
            <select id="TransfersFromSelect" name="TransfersFromSelect" className="form-control" onChange={(e) => TransfersReactModule.examineToAndFromAccounts(e)}
                aria-label="Select from account" aria-required="true" tabIndex="0">
                <option value="none">-- Select --</option>

                {_buildShareItemsOptGroup("from")}
                {_buildLoanItemsOptGroup("from")}
                {_buildHouseholdingShareItemsOptGroup("from")}
                {_buildHouseholdingLoanItemsOptGroup("from")}
                {_buildLinkedAccountItemsOptGroup("from")}

            </select>
        );
    }


    // Calculate 'TO' accounts for select drop-down list
    const _calculateToAccountSelect = () => {
        return (
            <select id="TransfersToSelect" name="TransfersToSelect" className="form-control" onChange={(e) => TransfersReactModule.examineToAndFromAccounts(e)}
                aria-label="Select to account" aria-required="true" tabIndex="0">
                <option value="none">-- Select --</option>

                {_buildShareItemsOptGroup("to")}
                {_buildLoanItemsOptGroup("to")}
                {_buildCrossAccountItemsOptGroup()}
                {_buildHouseholdingShareItemsOptGroup("to")}
                {_buildHouseholdingLoanItemsOptGroup("to")}
                {_buildHouseholdingCardItemsOptGroup()}
                {_buildLinkedAccountItemsOptGroup("to")}
                {_buildCardItemsOptGroup()}
            </select>
        );
    }


    // build share items opt group:
    const _buildShareItemsOptGroup = (which) => {
        if (_memberAccounts.shares && _memberAccounts.shares.length > 0) {

            if (which === "from" && _buildShareFromOptGroup) {
                return (
                    <optgroup label={TransfersReactObject.Settings.Literals.optGroupSharesText}>
                        {_memberAccounts.shares ? _memberAccounts.shares.map(TransfersReactModule.mapMemberItemsForFromDropDown) : null}
                    </optgroup>
                );
            }

            if (which === "to" && _buildShareToOptGroup) {
                return (
                    <optgroup label={TransfersReactObject.Settings.Literals.optGroupSharesText}>
                        {_memberAccounts.shares ? _memberAccounts.shares.map(TransfersReactModule.mapMemberItemsForToDropDown) : null}
                    </optgroup>
                );
            }
        }
    }

    // build loan items opt group:
    const _buildLoanItemsOptGroup = (which) => {
        if (_memberAccounts.loans && _memberAccounts.loans.length > 0) {
            if (which === "from" && _buildLoanFromOptGroup) {
                return (
                    <optgroup label={TransfersReactObject.Settings.Literals.optGroupLoansText}>
                        {_memberAccounts.loans ? _memberAccounts.loans.map(TransfersReactModule.mapMemberItemsForFromDropDown) : null}
                    </optgroup>
                );
            }

            if (which === "to" && _buildLoanToOptGroup) {
                return (
                    <optgroup label={TransfersReactObject.Settings.Literals.optGroupLoansText}>
                        {_memberAccounts.loans ? _memberAccounts.loans.map(TransfersReactModule.mapMemberItemsForToDropDown) : null}
                    </optgroup>
                );
            }
        }
    }

    // build householding share items opt group:
    const _buildHouseholdingShareItemsOptGroup = (which) => {
        var householdingShareOptGroups = [];

        if (_memberAccounts.householdingAccounts && _memberAccounts.householdingAccounts.length > 0) {
            if (which === "from") {
                for (var j = 0; j < _memberAccounts.householdingAccounts.length; j++) {
                    if (_memberAccounts.householdingAccounts[j].shares.length > 0) {
                        //console.log("_memberAccounts.householdingAccounts[" + j + "].shares.length ", _memberAccounts.householdingAccounts[j].shares.length);
                        (function x(j) {
                            var canTransferFrom = false;

                            for (var i = 0; i < _memberAccounts.householdingAccounts[j].shares.length; i++) {
                                if (_memberAccounts.householdingAccounts[j].shares[i].transferFrom) {
                                    canTransferFrom = true;
                                }
                            }

                            if (canTransferFrom) {
                                householdingShareOptGroups.push(
                                    <optgroup key={j + i + Math.floor(Math.random() * (9999998)) + 1} label={_memberAccounts.householdingAccounts[j].description + " Shares"} >
                                        {_buildOptGroupItems(_memberAccounts.householdingAccounts[j], "from")}
                                    </optgroup>
                                );
                            }

                        }(j));      // create a function to trap j
                    }
                }
                return householdingShareOptGroups;      // this will only return the last item unless there is a trapping function above
            }

            if (which === "to") {
                for (var j = 0; j < _memberAccounts.householdingAccounts.length; j++) {
                    if (_memberAccounts.householdingAccounts[j].shares.length > 0) {
                        //console.log("_memberAccounts.householdingAccounts[" + j + "].shares.length ", _memberAccounts.householdingAccounts[j].shares.length);
                        (function x(j) {
                            var canTransferTo = false;

                            for (var i = 0; i < _memberAccounts.householdingAccounts[j].shares.length; i++) {
                                if (_memberAccounts.householdingAccounts[j].shares[i].transferTo) {
                                    canTransferTo = true;
                                }
                            }

                            if (canTransferTo) {
                                householdingShareOptGroups.push(
                                    <optgroup key={j + i + Math.floor(Math.random() * (9999998)) + 1} label={_memberAccounts.householdingAccounts[j].description + " Shares"}>
                                        {_buildOptGroupItems(_memberAccounts.householdingAccounts[j], "to")}
                                    </optgroup>
                                );
                            }
                        }(j));      // create a function to trap j
                    }
                }
                return householdingShareOptGroups;      // this will only return the last item unless there is a trapping function above
            }
        }
    }

    // build householding loan items opt group:
    const _buildHouseholdingLoanItemsOptGroup = (which) => {
        var householdingLoanOptGroups = [];

        if (_memberAccounts.householdingAccounts && _memberAccounts.householdingAccounts.length > 0) {
            if (which === "from") {
                for (var j = 0; j < _memberAccounts.householdingAccounts.length; j++) {
                    if (_memberAccounts.householdingAccounts[j].loans.length > 0) {
                        (function x(j) {
                            var canTransferFrom = false;

                            for (var i = 0; i < _memberAccounts.householdingAccounts[j].loans.length; i++) {
                                if (_memberAccounts.householdingAccounts[j].loans[i].transferFrom) {
                                    canTransferFrom = true;
                                }
                            }

                            if (canTransferFrom) {
                                householdingLoanOptGroups.push(
                                    <optgroup key={j + i + Math.floor(Math.random() * (9999998)) + 1} label={_memberAccounts.householdingAccounts[j].description + " Loans"} >
                                        {_buildOptGroupItems(_memberAccounts.householdingAccounts[j], "from")}
                                    </optgroup>
                                );
                            }
                        }(j));      // create a function to trap j
                    }
                }
                return householdingLoanOptGroups;      // this will only return the last item unless there is a trapping function above
            }

            if (which === "to") {
                for (var j = 0; j < _memberAccounts.householdingAccounts.length; j++) {
                    if (_memberAccounts.householdingAccounts[j].loans.length > 0) {
                        (function x(j) {
                            var canTransferTo = false;

                            for (var i = 0; i < _memberAccounts.householdingAccounts[j].loans.length; i++) {
                                if (_memberAccounts.householdingAccounts[j].loans[i].transferTo) {
                                    canTransferTo = true;
                                }
                            }

                            if (canTransferTo) {
                                householdingLoanOptGroups.push(
                                    <optgroup key={j + i + Math.floor(Math.random() * (9999998)) + 1} label={_memberAccounts.householdingAccounts[j].description + " Loans"}>
                                        {_buildOptGroupItems(_memberAccounts.householdingAccounts[j], "to")}
                                    </optgroup>
                                );
                            }
                        }(j));      // create a function to trap j
                    }
                }
                return householdingLoanOptGroups;      // this will only return the last item unless there is a trapping function above
            }
        }
    }

    // build householding card items opt group (THIS SHOULD ONLY APPEAR IN THE "TO" DROP DOWN):
    const _buildHouseholdingCardItemsOptGroup = () => {
        var householdingCardOptGroups = [];

        for (var j = 0; j < _memberAccounts.householdingAccounts.length; j++) {
            if (_memberAccounts.householdingAccounts[j].cards.length > 0) {
                (function x(j) {
                    var canTransferTo = false;

                    for (var i = 0; i < _memberAccounts.householdingAccounts[j].cards.length; i++) {
                        if (_memberAccounts.householdingAccounts[j].cards[i].transferTo) {
                            canTransferTo = true;
                        }
                    }

                    if (canTransferTo) {
                        householdingCardOptGroups.push(
                            <optgroup key={j + i + Math.floor(Math.random() * (9999998)) + 1} label={_memberAccounts.householdingAccounts[j].description + " Cards"}>
                                {_buildOptGroupItems(_memberAccounts.householdingAccounts[j], "to")}
                            </optgroup>
                        );
                    }
                }(j));      // create a function to trap j
            }
            return householdingCardOptGroups;      // this will only return the last item unless there is a trapping function above
        }
    }


    // build  cross account share items opt group (THIS SHOULD ONLY APPEAR IN THE "TO" DROP DOWN):
    const _buildCrossAccountItemsOptGroup = () => {
        if (_memberAccounts.crossAccounts && _memberAccounts.crossAccounts.length > 0 && _buildCrossAccountToOptGroup) {
            return (
                <optgroup label={TransfersReactObject.Settings.Literals.optGroupCrossAccountText}>
                    {_memberAccounts.crossAccounts ? _memberAccounts.crossAccounts.map(TransfersReactModule.mapMemberItemsForToDropDown) : null}
                </optgroup>
            );
        }
    }


    // build card items opt group (THIS SHOULD ONLY APPEAR IN THE "TO" DROP DOWN):
    const _buildCardItemsOptGroup = () => {
        if (_memberAccounts.cards && _memberAccounts.cards.length > 0 && _buildCardToOptGroup) {
            return (
                <optgroup label={TransfersReactObject.Settings.Literals.optGroupCardsText}>
                    {_memberAccounts.cards ? _memberAccounts.cards.map(TransfersReactModule.mapMemberItemsForToDropDown) : null}
                </optgroup>
            );
        }
    }

    // build linked account items opt group:
    const _buildLinkedAccountItemsOptGroup = (which) => {
        if (_memberAccounts.linkedAccounts && _memberAccounts.linkedAccounts.length > 0) {
            if (which === "from" && _buildLinkedAccountFromOptGroup) {
                return (
                    <optgroup label={TransfersReactObject.Settings.Literals.optGroupLinkedAccountsText}>
                        {_memberAccounts.linkedAccounts ? _memberAccounts.linkedAccounts.map(TransfersReactModule.mapMemberItemsForFromDropDown) : null}
                    </optgroup>
                );
            }

            if (which === "to" && _buildLinkedAccountToOptGroup) {
                return (
                    <optgroup label={TransfersReactObject.Settings.Literals.optGroupLinkedAccountsText}>
                        {_memberAccounts.linkedAccounts ? _memberAccounts.linkedAccounts.map(TransfersReactModule.mapMemberItemsForToDropDown) : null}
                    </optgroup>
                );
            }
        }
    }


    // Group items together when there is a possiblity of multiple option groups... we need to agregate them before mapping them. which = "from" or "to"
    const _buildOptGroupItems = (items, which) => {
        //console.log("_buildOptGroupItems items ========= ", items);

        var optionItems = [];

        // SHARES
        if (items.shares.length > 0) {
            if (which === "from") {
                optionItems.push(items.shares.map(TransfersReactModule.mapMemberItemsForFromDropDown));
            } else if (which === "to") {
                optionItems.push(items.shares.map(TransfersReactModule.mapMemberItemsForToDropDown));
            }
        }

        // LOANS
        if (items.loans.length > 0) {
            if (which === "from") {
                optionItems.push(items.loans.map(TransfersReactModule.mapMemberItemsForFromDropDown));
            } else if (which === "to") {
                optionItems.push(items.loans.map(TransfersReactModule.mapMemberItemsForToDropDown));
            }
        }

        // CARDS
        if (items.cards.length > 0) {
            optionItems.push(items.loans.map(TransfersReactModule.mapMemberItemsForToDropDown));
        }

        return optionItems;
    }


    // map each account to an option item for the "from" drop-down select list
    const _mapMemberItemsForFromDropDown = (item) => {
        if (item.transferFrom) {
            return (
                <option key={item.id} value={item.id}>{item.description} {item.available ? "(" + HomeBanking.Utilities.Currency.FormatCentsToDollars(item.available) + ")" : ""}</option>
            );
        }
    }


    // map each account to an option item for the "to" drop-down select list
    const _mapMemberItemsForToDropDown = (item) => {
        if (item.transferTo && item.payment && item.payment.length > 0 && item.lnPayoff && item.lnPayoff.length > 0) {  // loans with payoff
            return (
                <option key={item.id} value={item.id}>{item.description} {item.payment ? "(Payment: " + HomeBanking.Utilities.Currency.FormatCentsToDollars(item.payment) + "; Payoff: " +
                    HomeBanking.Utilities.Currency.FormatCentsToDollars(item.lnPayoff) + ")" : ""}</option>
            );
        } else if (item.slType === "CREDIT" && item.transferTo && item.minimumDue != null && (item.minimumDue.length > 0 || item.minimumDue !== "0")) {    // cards with minimum due
            return (
                <option key={item.id} value={item.id}>{item.cardDisplay} {item.minimumDue ? "(Minimum Due: " + HomeBanking.Utilities.Currency.FormatCentsToDollars(item.minimumDue) + ")" : ""}</option>
            );
        } else if (item.slType === "CREDIT" && item.transferTo && item.cardBal != null && (item.cardBal.length > 0 || item.cardBal !== "0")) {    // cards with no minimum due but with a balance
            return (
                <option key={item.id} value={item.id}>{item.cardDisplay} {item.cardBal ? "(Balance: " + HomeBanking.Utilities.Currency.FormatCentsToDollars(item.cardBal) + ")" : ""}</option>
            );
        } else if (item.slType === "CREDIT" && item.transferTo ) {    // cards with no minimum due or balance
            return (
                <option key={item.id} value={item.id}>{item.cardDisplay}</option>
            );
        } else if (item.transferTo && item.payment && item.payment.length > 0) {    // loans
            return (
                <option key={item.id} value={item.id}>{item.description} {item.payment ? "(Payment: " + HomeBanking.Utilities.Currency.FormatCentsToDollars(item.payment) + ")" : ""}</option>
            );
        } else if (item.transferTo) {   // shares
            return (
                <option key={item.id} value={item.id}>{item.description} {item.balance ? "(" + HomeBanking.Utilities.Currency.FormatCentsToDollars(item.balance) + ")" : ""}</option>
            );
        }
    }


    // Calculate 'FEE' accounts for select drop-down list
    const _calculateFeeAccountSelect = () => {
        // console.log("_feeAccounts: ", _feeAccounts);

        return (
            <select id="FeeAccountSelect" name="FeeAccountSelect" className="form-control" onChange={(e) => TransfersReactModule.setSelectedFeeAccount(e)} aria-label="Select fee account" aria-required="true">
                <option value="none">-- Select --</option>

                {_feeAccounts.shares ? _feeAccounts.shares.map(TransfersReactModule.mapFeeItemsForDropDown) : null}
                {_feeAccounts.loans ? _feeAccounts.loans.map(TransfersReactModule.mapFeeItemsForDropDown) : null}
            </select>
        );
    }


    // map each account to an option item for the "fee" drop-down select list - don't think we need optGroups...
    const _mapFeeItemsForDropDown = (item) => {
        if (item.available > 0) {
            return (
                <option key={item.id} value={item.id}>{item.description} {item.available ? "(" + HomeBanking.Utilities.Currency.FormatCentsToDollars(item.available) + ")" : ""}</option>
            );
        }
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


    // Trim the .Net dates to human readable
    const _trimNetDate = (dateString) => {
        if (dateString === undefined || dateString === null || dateString === "") {
            return "unknown";
        }

        return dateString.substring(0, 10);
    }


    // format .net date to date picker date:
    const _formatNetDateForPaymentDeliverByDate = (dateString) => {
        if (dateString === undefined || dateString === null || dateString === "") {
            return "unknown";
        }

        return dateString.substring(5, 7) + "/" + dateString.substring(8, 10) + "/" + dateString.substring(0, 4);
    }


    // Transfer/Scheduled Transfer Form Validation:
    const _validateScheduledTransferForm = (validateNonScheduledPortionOnly) => {
        var TransfersFormBlob = document.getElementById("TransfersForm");
        var TransfersFormFormValid;
        var TransfersFormAmountRegx = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
        var TransfersFormTextRegx = /^[A-Za-z\d\-_.,!"'?\s]+$/;
        var TransfersFormNumberRegx = /^\d+$/;

        // Set up values
        var fromAccount = _selectedFromAccount;
        var toAccount = _selectedToAccount;

        //$("#AddPaymentSubmitButton").prop("disabled", true);
        $("#TransfersValidationDiv").empty();
        $("#TransfersValidationDiv").html("Please correct the following errors:");


        // 'From' drop down select list
        if (TransfersFormBlob.TransfersFromSelect.value === "none") {
            document.getElementById("TransfersFromSelect").style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageSelectAccountFromText); // Please select an account to transfer the money from.
            TransfersFormFormValid = false;
            // check for sufficient funds in "From" account
        } else if (fromAccount !== null && fromAccount.available < HomeBanking.Utilities.Currency.ParseDollarsToCents(TransfersFormBlob.TransferAmountTextbox.value)) {
            document.getElementById("TransfersFromSelect").style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageInsufficientFundsAvailableText); // There aren't sufficient funds available in the selected account.
            TransfersFormFormValid = false;
            // validate whether the source account allows linked transfers from it.
        } else if (fromAccount !== null && fromAccount.slType === "LINKED" && fromAccount.achTransferFrom === false) {
            document.getElementById("TransfersFromSelect").style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageTransfersToExternalAccountsText); // Transfers to external accounts from the selected account are not allowed.
            TransfersFormFormValid = false;
        } else {
            document.getElementById("TransfersFromSelect").style.outline = "none";
        }

        // 'To' drop down select list
        if (TransfersFormBlob.TransfersToSelect.value === "none") {
            document.getElementById("TransfersToSelect").style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageSelectAccountToText); // Please select an account to transfer the money to.
            TransfersFormFormValid = false;
            // validates whether the destination account allows linked transfers to it
        } else if (fromAccount !== null && toAccount !== null && fromAccount.slType === "LINKED" &&
            (toAccount.achTransferTo === false || toAccount.isCrossAccount || toAccount.slType === "CREDIT")) {
            document.getElementById("TransfersToSelect").style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageTransfersToLinkedAccountsText);    //Transfers from linked accounts to the selected account are not allowed.
            TransfersFormFormValid = false;
            // validate whether joint to joint transfers are allowed
        } else if (fromAccount !== null && fromAccount.isCrossAccount && toAccount !== null && toAccount.isCrossAccount
            && TransfersReactObject.Settings.transferConfiguration.AllowJointToJointTransfer === false) {
            document.getElementById("TransfersToSelect").style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageTransfersToHouseholdAccountsText);    //Transfers from household accounts to household accounts are not allowed.
            TransfersFormFormValid = false;
            // validate that the chosen accounts are not both linked accounts
        } else if (fromAccount !== null && toAccount !== null && fromAccount.slType === "LINKED" && toAccount.slType === "LINKED") {
            document.getElementById("TransfersToSelect").style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageExternalToExternalText);    // Transfers from external accounts to external accounts are not supported.
            TransfersFormFormValid = false;
            // validates whether the amount will set the card balance negative (paying more than what is owed on the card)
        } else if (toAccount !== null && toAccount.slType === "CREDIT" &&
            toAccount.cardBal - HomeBanking.Utilities.Currency.ParseDollarsToCents(TransfersFormBlob.TransferAmountTextbox.value) < 0) {
            document.getElementById("TransfersToSelect").style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageCreditMoreThanOwedText);    //You cannot transfer more to the card then what is owed.
            TransfersFormFormValid = false;
        } else {
            document.getElementById("TransfersToSelect").style.outline = "none";
        }

        // checking for if accounts are the same:
        if ($("#TransfersFromSelect").val() !== "none" && $("#TransfersToSelect").val() !== "none") {
            if ($("#TransfersFromSelect").val() === $("#TransfersToSelect").val()) {
                document.getElementById("TransfersToSelect").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageSourceAndDesinationAccountsMustBeDifferentText);    //You cannot transfer more to the card then what is owed.
                TransfersFormFormValid = false;
            } else {
                document.getElementById("TransfersToSelect").style.outline = "none";
            }
        }

        // payment amount
        if (TransfersFormBlob.TransferAmountTextbox.value === "") {                                     // required
            document.getElementById("TransferAmountTextbox").parentNode.style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessagePaymentAmountText);    //Please enter the amount of the payment.
            TransfersFormFormValid = false;
            // make sure they have a positive abount entered
        } else if (parseFloat(TransfersFormBlob.TransferAmountTextbox.value) <= 0) {
            document.getElementById("TransferAmountTextbox").parentNode.style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageValidAmountText);    //Please enter a valid amount.
            TransfersFormFormValid = false;
            // Regex test
        } else if (!TransfersFormAmountRegx.test(TransfersFormBlob.TransferAmountTextbox.value)) {
            document.getElementById("TransferAmountTextbox").parentNode.style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageValidAmountText);    //Please enter a valid amount.
            TransfersFormFormValid = false;
            // validate transfer limit from
        } else if (_selectedFromAccount && _selectedFromAccount.limitFrom !== null
            && HomeBanking.Utilities.Currency.ParseDollarsToCents(TransfersFormBlob.TransferAmountTextbox.value) > _selectedFromAccount.limitFrom) {
            document.getElementById("TransferAmountTextbox").parentNode.style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageFromTransferLimitText);    //Amount entered exceeds the transfer from account dollar limit.
            TransfersFormFormValid = false;
            // validate transfer limit to
        } else if (_selectedToAccount && _selectedToAccount.limitTo !== null
            && HomeBanking.Utilities.Currency.ParseDollarsToCents(TransfersFormBlob.TransferAmountTextbox.value) > _selectedToAccount.limitTo) {
            document.getElementById("TransferAmountTextbox").parentNode.style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageToTransferLimitText);    //Amount entered exceeds the transfer to account dollar limit.
            TransfersFormFormValid = false;
        } else {
            document.getElementById("TransferAmountTextbox").parentNode.style.outline = "none";
        }

        // Fee dropdown:
        if ($("#FeeSelectDiv").is(":visible") && (TransfersFormBlob.FeeAccountSelect.value === "none" || _selectedFeeAccount === null)) {
            document.getElementById("FeeAccountSelect").style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageSelectFeeAccountText);    //Please select an account from which to draw the fee.
            TransfersFormFormValid = false;
            // Validates the selected fee account has enough funds to cover fee.
        } else if ($("#FeeSelectDiv").is(":visible") && _selectedFeeAccount !== null) {
            var feeAmountTotal = 0

            if (_selectedFromAccount !== null && isFinite(Number(_selectedFromAccount.feeAmountFrom))) {
                feeAmountTotal += Number(_selectedFromAccount.feeAmountFrom);
            }
            if (_selectedToAccount !== null && isFinite(Number(_selectedToAccount.feeAmountTo))) {
                feeAmountTotal += Number(_selectedToAccount.feeAmountTo);
            }

            if (feeAmountTotal > Number(_selectedFeeAccount.Available)) {
                document.getElementById("FeeAccountSelect").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageInsufficientFeeFundsText);    //You do not have sufficient funds in this account for the fee.
                TransfersFormFormValid = false;
            } else {
                document.getElementById("FeeAccountSelect").style.outline = "none";
            }
        } else {
            document.getElementById("FeeAccountSelect").style.outline = "none";
        }

        // IRA Contribution Year validation
        if (_selectedToAccount && _selectedToAccount.allowIRAPreviousYear === true && !$("#ScheduledTransferCheckbox").is(":checked")
            && typeof TransfersFormBlob.IraContributionYearSelect !== "undefined" && TransfersFormBlob.IraContributionYearSelect.value === "none") {
            document.getElementById("IraContributionYearSelect").style.outline = "1px solid red";
            $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageSelectIRAContributionText);    //Please select a year for your IRA contribution.
            TransfersFormFormValid = false;
        } else {
            document.getElementById("IraContributionYearSelect").style.outline = "none";
        }

        // this is called when the 'frequency' drop-down is changed. We need to re-validate the Non-Scheduled portion of the form
        if (validateNonScheduledPortionOnly) {
            if (TransfersFormFormValid === false) {
                $("#TransfersValidationDiv").slideDown();
                $("#TransfersValidationDiv").focus();
                $("#AddPaymentSubmitButton").prop("disabled", false);
                return false;
            } else {
                $("#TransfersValidationDiv").slideUp("normal");
                $("#TransfersValidationDiv").empty();
                return;
            }
        }


        // Scheduled Transfers Sections validation
        if (TransfersReactObject.Settings.transferConfiguration.AllowScheduledTransfers === true && $("#ScheduledTransferCheckbox").is(":checked")) {
            // description
            if (TransfersFormBlob.ScheduledTransferDescriptionTextbox.value === "") {
                document.getElementById("ScheduledTransferDescriptionTextbox").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageScheduledTransferDescriptionText);    //Please enter a description for your recurring payment.
                TransfersFormFormValid = false;
            } else if (!TransfersFormTextRegx.test(TransfersFormBlob.ScheduledTransferDescriptionTextbox.value)) {
                document.getElementById("ScheduledTransferDescriptionTextbox").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageScheduledTransDescNotValidText);    //Please enter a valid description for your recurring payment.
                TransfersFormFormValid = false;
            } else {
                document.getElementById("ScheduledTransferDescriptionTextbox").style.outline = "none";
            }

            // frequency
            var allowedFrequencyTypes = TransfersReactModule.getAllowedScheduleTransferFrequencies();

            // frequency is required for scheduled transfers
            if (TransfersFormBlob.ScheduledTransferFrequencySelect.value === "none") {
                document.getElementById("ScheduledTransferFrequencySelect").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageSelectFrequencyText);    //Please select a frequency.
                TransfersFormFormValid = false;
                // validates whether the selected scheduled transfer frequency is allowed
            } else if (!allowedFrequencyTypes === null && $.inArray(TransfersFormBlob.ScheduledTransferFrequencySelect.value, allowedFrequencyTypes) === -1) {
                document.getElementById("ScheduledTransferFrequencySelect").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageFrequencyNotAllowedText);    //The frequency is not allowed for the selected accounts.
                TransfersFormFormValid = false;
            } else {
                document.getElementById("ScheduledTransferFrequencySelect").style.outline = "none";
            }

            // beginning date
            if ($("#ScheduledTransferBeginningDateTextbox").val() === "") {
                document.getElementById("ScheduledTransferBeginningDateTextbox").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterBeginningDateText);    //Please enter a beginning date.
                TransfersFormFormValid = false;
                // valid date?
            } else if (!Date.parse(TransfersFormBlob.ScheduledTransferBeginningDateTextbox.value)) {
                document.getElementById("ScheduledTransferBeginningDateTextbox").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidBeginningDateText);    //Please enter a valid beginning date (mm/dd/yyyy 0:00 am/pm format).
                TransfersFormFormValid = false;
                // check to see if the chosen start date is in the future and NOT in the past
            } else if (Date.parse(TransfersFormBlob.ScheduledTransferBeginningDateTextbox.value) < Date.parse(new Date())) {
                document.getElementById("ScheduledTransferBeginningDateTextbox").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageBeginningDateNotInFutureText);    //Please enter a start date that is in the future.
                TransfersFormFormValid = false;
            } else {
                document.getElementById("ScheduledTransferBeginningDateTextbox").style.outline = "none";
            }

            // validates whether joint to joint scheduled transfers are allowed
            if (fromAccount !== null && fromAccount.isCrossAccount && toAccount !== null && toAccount.isCrossAccount
                && TransfersReactObject.Settings.transferConfiguration.AllowJointToJointScheduledTransfer === false) {
                document.getElementById("TransfersToSelect").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageSchedTransHouseholdNotAllowedText);    //Scheduled transfers from household accounts to household accounts are not allowed.
                TransfersFormFormValid = false;
            } else {
                document.getElementById("TransfersToSelect").style.outline = "none";
            }

            // daily:
            if (TransfersFormBlob.ScheduledTransferFrequencySelect.value === _scheduledFrequencyEnum.DAILY) {
                // radios
                if (!$("#ScheduledTransferDailyXdaysRadio").is(":checked") && !$("#ScheduledTransferDailyWeekdayRadio").is(":checked")) {
                    document.getElementById("ScheduledTransferDailyXdaysRadio").parentNode.parentNode.style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageDailyOccurenceOptionText);    //Please select an occurrence option.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferDailyXdaysRadio").parentNode.parentNode.style.outline = "none";
                }

                // day frequency
                if ($("#ScheduledTransferDailyXdaysRadio").is(":checked") && $("#ScheduledTransferBeginningTextbox").val() === "") {
                    document.getElementById("ScheduledTransferBeginningTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageDailySelectDayOccurenceText);    //Please enter a day occurence.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferDailyXdaysRadio").is(":checked") && !TransfersFormNumberRegx.test(TransfersFormBlob.ScheduledTransferBeginningTextbox.value)) {
                    document.getElementById("ScheduledTransferBeginningTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidNumberText);    //Please enter a valid number.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferBeginningTextbox").style.outline = "none";
                }
            }

            // weekly
            if (TransfersFormBlob.ScheduledTransferFrequencySelect.value === _scheduledFrequencyEnum.WEEKLY) {
                // weekly occurance
                if ($("#ScheduledTransferWeeklyTextbox").val() === "") {
                    document.getElementById("ScheduledTransferWeeklyTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageSelectWeeklyOccurenceText);    //Please enter a weekly occurence.
                    TransfersFormFormValid = false;
                } else if (!TransfersFormNumberRegx.test(TransfersFormBlob.ScheduledTransferWeeklyTextbox.value)) {
                    document.getElementById("ScheduledTransferWeeklyTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidNumberText);    //Please enter a valid number.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferWeeklyTextbox").style.outline = "none";
                }

                // weekday checkboxes
                if (!$("#ScheduledTransferWeeklyMondayCheckbox").is(":checked") && !$("#ScheduledTransferWeeklyTuesdayCheckbox").is(":checked") &&
                    !$("#ScheduledTransferWeeklyWednesdayCheckbox").is(":checked") && !$("#ScheduledTransferWeeklyThursdayCheckbox").is(":checked") &&
                    !$("#ScheduledTransferWeeklyFridayCheckbox").is(":checked")) {
                    document.getElementById("ScheduledTransferWeeklyMondayCheckbox").parentNode.style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageWeeklySelectWeekdayText);    //Please select a weekday option.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferWeeklyMondayCheckbox").parentNode.style.outline = "none";
                }
            }

            // twice monthly:
            if (TransfersFormBlob.ScheduledTransferFrequencySelect.value === _scheduledFrequencyEnum.TWICE_MONTHLY) {
                // radios
                if (!$("#ScheduledTransferTwiceMonthlyChosenDaysRadio").is(":checked") && !$("#ScheduledTransferTwiceMonthly15thAndLastDayRadio").is(":checked")) {
                    document.getElementById("ScheduledTransferTwiceMonthlyChosenDaysRadio").parentNode.parentNode.style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageSelectTwiceMonthyOccurrenceText);    //Please select an occurance option.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferTwiceMonthlyChosenDaysRadio").parentNode.parentNode.style.outline = "none";
                }

                // chosen days - starting day
                if ($("#ScheduledTransferTwiceMonthlyChosenDaysRadio").is(":checked") && $("#ScheduledTransferTwiceMonthlyBeginningDayTextbox").val() === "") {
                    document.getElementById("ScheduledTransferTwiceMonthlyBeginningDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageTwiceMonthlyBeginningDayText);    //Please enter a beginning day.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferTwiceMonthlyChosenDaysRadio").is(":checked") && !TransfersFormNumberRegx.test(TransfersFormBlob.ScheduledTransferTwiceMonthlyBeginningDayTextbox.value)) {
                    document.getElementById("ScheduledTransferTwiceMonthlyBeginningDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidNumberText);    //Please enter a valid number.
                    TransfersFormFormValid = false;
                    // check that first day is valid number
                } else if ($("#ScheduledTransferTwiceMonthlyChosenDaysRadio").is(":checked") &&
                    (TransfersFormBlob.ScheduledTransferTwiceMonthlyBeginningDayTextbox.value < 1 || TransfersFormBlob.ScheduledTransferTwiceMonthlyBeginningDayTextbox.value > 30)) {
                    document.getElementById("ScheduledTransferTwiceMonthlyBeginningDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageTwiceMonthlyValidBeginningDayText);    //Please enter a number between 1 and 30.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferTwiceMonthlyBeginningDayTextbox").style.outline = "none";
                }

                // chosen days - ending day
                if ($("#ScheduledTransferTwiceMonthlyChosenDaysRadio").is(":checked") && $("#ScheduledTransferTwiceMonthlyConcludingDayTextbox").val() === "") {
                    document.getElementById("ScheduledTransferTwiceMonthlyConcludingDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageTwiceMonthlyEnterEndingDayText);    //Please enter an ending day.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferTwiceMonthlyChosenDaysRadio").is(":checked") && !TransfersFormNumberRegx.test(TransfersFormBlob.ScheduledTransferTwiceMonthlyConcludingDayTextbox.value)) {
                    document.getElementById("ScheduledTransferTwiceMonthlyConcludingDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidNumberText);    //Please enter a valid number.
                    TransfersFormFormValid = false;
                    // check that last day is valid number
                } else if ($("#ScheduledTransferTwiceMonthlyChosenDaysRadio").is(":checked") &&
                    (TransfersFormBlob.ScheduledTransferTwiceMonthlyConcludingDayTextbox.value < 2 || TransfersFormBlob.ScheduledTransferTwiceMonthlyConcludingDayTextbox.value > 31)) {
                    document.getElementById("ScheduledTransferTwiceMonthlyConcludingDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageTwiceMonthlyValidEndingDayText);    //Please enter a number between 2 and 31.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferTwiceMonthlyConcludingDayTextbox").style.outline = "none";
                }

                // check starting day and ending day aren't the same day
                if ($("#ScheduledTransferTwiceMonthlyChosenDaysRadio").is(":checked") &&
                    (TransfersFormBlob.ScheduledTransferTwiceMonthlyBeginningDayTextbox.value === TransfersFormBlob.ScheduledTransferTwiceMonthlyConcludingDayTextbox.value)) {
                    document.getElementById("ScheduledTransferTwiceMonthlyConcludingDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageTwiceMonthlyNotSameDaysText);    //Transfer days cannot be the same day.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferTwiceMonthlyConcludingDayTextbox").style.outline = "none";
                }

                // chosen days - monthly frequency
                if ($("#ScheduledTransferTwiceMonthlyChosenDaysRadio").is(":checked") && $("#ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox").val() === "") {
                    document.getElementById("ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageTwiceMonthlyMonthlyRecurrenceText);    //Please enter a monthly recurrence.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferTwiceMonthlyChosenDaysRadio").is(":checked") && !TransfersFormNumberRegx.test(TransfersFormBlob.ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox.value)) {
                    document.getElementById("ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidNumberText);    //Please enter a valid number.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox").style.outline = "none";
                }

                // 15th and Last day of the month
                if ($("#ScheduledTransferTwiceMonthly15thAndLastDayRadio").is(":checked") && $("#ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox").val() === "") {
                    document.getElementById("ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageTwiceMonthly15AndLastBeginningDayText);    //Please enter a beginning day.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferTwiceMonthly15thAndLastDayRadio").is(":checked") && !TransfersFormNumberRegx.test(TransfersFormBlob.ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox.value)) {
                    document.getElementById("ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidNumberText);    //Please enter a valid number.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox").style.outline = "none";
                }
            }

            // monthly:
            if (TransfersFormBlob.ScheduledTransferFrequencySelect.value === _scheduledFrequencyEnum.MONTHLY) {
                // radios
                if (!$("#ScheduledTransferMonthlyMonthNthRadio").is(":checked") && !$("#ScheduledTransferMonthlyLastDayRadio").is(":checked") &&
                    !$("#ScheduledTransferMonthlyChosenDaysRadio").is(":checked")) {
                    document.getElementById("ScheduledTransferMonthlyMonthNthRadio").parentNode.parentNode.style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageMonthlyOccurrenceText);    //Please select an occurance option.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferMonthlyMonthNthRadio").parentNode.parentNode.style.outline = "none";
                }

                // monthly chosen days
                if ($("#ScheduledTransferMonthlyChosenDaysRadio").is(":checked") && $("#ScheduledTransferMonthlyBeginningDayTextbox").val() === "") {
                    document.getElementById("ScheduledTransferMonthlyBeginningDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageMonthlyDayOccurrenceText);    //Please enter a day occurence.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferMonthlyChosenDaysRadio").is(":checked") && !TransfersFormNumberRegx.test(TransfersFormBlob.ScheduledTransferMonthlyBeginningDayTextbox.value)) {
                    document.getElementById("ScheduledTransferMonthlyBeginningDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidNumberText);    //Please enter a valid number.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferMonthlyChosenDaysRadio").is(":checked") && $("#ScheduledTransferMonthlyBeginningDayTextbox").val() < 1 || $("#ScheduledTransferMonthlyBeginningDayTextbox").val() > 31) {
                    document.getElementById("ScheduledTransferMonthlyBeginningDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageMonthlyValidDayText);    //Please enter a number between 1 and 31.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferMonthlyBeginningDayTextbox").style.outline = "none";
                }

                // monthly chosen days frequency
                if ($("#ScheduledTransferMonthlyChosenDaysRadio").is(":checked") && $("#ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox").val() === "") {
                    document.getElementById("ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageMonthlyChosenDayMonthlyOccurrenceText);    //Please enter a monthy occurence.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferMonthlyChosenDaysRadio").is(":checked") && !TransfersFormNumberRegx.test(TransfersFormBlob.ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox.value)) {
                    document.getElementById("ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidNumberText);    //Please enter a valid number.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox").style.outline = "none";
                }

                // monthly last day of the month frequency
                if ($("#ScheduledTransferMonthlyLastDayRadio").is(":checked") && $("#ScheduledTransferMonthlyLastDayTextbox").val() === "") {
                    document.getElementById("ScheduledTransferMonthlyLastDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageMonthlyLastDayMonthllyOccurrenceText);    //Please enter a monthy occurence.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferMonthlyLastDayRadio").is(":checked") && !TransfersFormNumberRegx.test(TransfersFormBlob.ScheduledTransferMonthlyLastDayTextbox.value)) {
                    document.getElementById("ScheduledTransferMonthlyLastDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidNumberText);    //Please enter a valid number.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferMonthlyLastDayTextbox").style.outline = "none";
                }

                // monthly weekday Nth selections
                if ($("#ScheduledTransferMonthlyMonthNthRadio").is(":checked") && !$("#ScheduledTransferMonthlyMondayCheckbox").is(":checked") &&
                    !$("#ScheduledTransferMonthlyTuesdayCheckbox").is(":checked") && !$("#ScheduledTransferMonthlyWednesdayCheckbox").is(":checked") &&
                    !$("#ScheduledTransferMonthlyThursdayCheckbox").is(":checked") && !$("#ScheduledTransferMonthlyFridayCheckbox").is(":checked")) {
                    document.getElementById("ScheduledTransferMonthlyMondayCheckbox").parentNode.style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageMonthlyNthSelectWeekdaysText);    //Please select a weekday or weekdays.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferMonthlyMondayCheckbox").parentNode.style.outline = "none";
                }

                // monthly monthly Nth frequency
                if ($("#ScheduledTransferMonthlyMonthNthRadio").is(":checked") && $("#ScheduledTransferMonthlyMonthlyNthTextbox").val() === "") {
                    document.getElementById("ScheduledTransferMonthlyMonthlyNthTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageMonthlyNthMonthlyOccurrenceText);    //Please enter a monthy occurence.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferMonthlyMonthNthRadio").is(":checked") && !TransfersFormNumberRegx.test(TransfersFormBlob.ScheduledTransferMonthlyMonthlyNthTextbox.value)) {
                    document.getElementById("ScheduledTransferMonthlyMonthlyNthTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidNumberText);    //Please enter a valid number.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferMonthlyMonthlyNthTextbox").style.outline = "none";
                }
            }

            // yearly:
            if (TransfersFormBlob.ScheduledTransferFrequencySelect.value === _scheduledFrequencyEnum.YEARLY) {
                // radios
                if (!$("#ScheduledTransferYearlySelectMonthRadio").is(":checked") && !$("#ScheduledTransferYearlyDayOfMonthRadio").is(":checked") &&
                    !$("#ScheduledTransferYearlyYearlyNthRadio").is(":checked")) {
                    document.getElementById("ScheduledTransferYearlySelectMonthRadio").parentNode.parentNode.style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageYearlySelectOccurrenceText);    //Please select an occurance option.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferYearlySelectMonthRadio").parentNode.parentNode.style.outline = "none";
                }

                // yearly month day of month
                if ($("#ScheduledTransferYearlySelectMonthRadio").is(":checked") && $("#ScheduledTransferYearlyDayTextbox").val() === "") {
                    document.getElementById("ScheduledTransferYearlyDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageYearlyMonthDayDayOfMonthText);    //Please enter a day of the month.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferYearlySelectMonthRadio").is(":checked") && !TransfersFormNumberRegx.test(TransfersFormBlob.ScheduledTransferYearlyDayTextbox.value)) {
                    document.getElementById("ScheduledTransferYearlyDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidNumberText);    //Please enter a valid number.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferYearlySelectMonthRadio").is(":checked") && $("#ScheduledTransferYearlyDayTextbox").val() < 1 || $("#ScheduledTransferYearlyDayTextbox").val() > 31) {
                    document.getElementById("ScheduledTransferYearlyDayTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageYearlyMonthDayValidNumberText);    //Please enter a number between 1 and 31.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferYearlyDayTextbox").style.outline = "none";
                }

                // yearly yearlyNth weekday selections
                if ($("#ScheduledTransferYearlyYearlyNthRadio").is(":checked") && !$("#ScheduledTransferYearlyNthMondayCheckbox").is(":checked") &&
                    !$("#ScheduledTransferYearlyNthTuesdayCheckbox").is(":checked") && !$("#ScheduledTransferYearlyNthWednesdayCheckbox").is(":checked") &&
                    !$("#ScheduledTransferYearlyNthThursdayCheckbox").is(":checked") && !$("#ScheduledTransferYearlyNthFridayCheckbox").is(":checked")) {
                    document.getElementById("ScheduledTransferYearlyNthMondayCheckbox").parentNode.style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageYearlyNthSelectWeekdaysText);    //Please select a weekday or weekdays.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferYearlyNthMondayCheckbox").parentNode.style.outline = "none";
                }

                // yearly yearlyNth yearly interval textbox
                if ($("#ScheduledTransferYearlyYearlyNthRadio").is(":checked") && $("#ScheduledTransferYearlyNthTextbox").val() === "") {
                    document.getElementById("ScheduledTransferYearlyNthTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageYearlyNthYearlyIntervalText);    //Please enter a yearly interval.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferYearlyYearlyNthRadio").is(":checked") && !TransfersFormNumberRegx.test(TransfersFormBlob.ScheduledTransferYearlyNthTextbox.value)) {
                    document.getElementById("ScheduledTransferYearlyNthTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEnterValidNumberText);    //Please enter a valid number.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferYearlyYearlyNthRadio").is(":checked") && $("#ScheduledTransferYearlyNthTextbox").val() < 1) {
                    document.getElementById("ScheduledTransferYearlyNthTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageYearlyEnterPositiveNumberText);    //Please enter a positive number.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferYearlyNthTextbox").style.outline = "none";
                }
            }

            // ending year/occurence/date
            if (TransfersFormBlob.ScheduledTransferFrequencySelect.value !== "none" && TransfersFormBlob.ScheduledTransferFrequencySelect.value !== _scheduledFrequencyEnum.ONE_TIME) {
                if (!$("#ScheduledTransferEndingInYearsRadio").is(":checked") && !$("#ScheduledTransferEndingXoccurencesRadio").is(":checked") &&
                    !$("#ScheduledTransferEndingByDateRadio").is(":checked") && !$("#ScheduledTransferEndingNoEndRadio").is(":checked")) {
                    document.getElementById("ScheduledTransferEndingInYearsRadio").parentNode.parentNode.style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEndingDateOptionText);    //Please select an end date option.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferEndingInYearsRadio").parentNode.parentNode.style.outline = "none";
                }

                // end in how many years
                if ($("#ScheduledTransferEndingInYearsRadio").is(":checked") && ($("#ScheduledTransferEndingYearsTextbox").val() === "" ||
                    $("#ScheduledTransferEndingYearsTextbox").val() < 1)) {
                    document.getElementById("ScheduledTransferEndingYearsTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEndingEnterHowManyYearsText);    //Please enter an 'end in how many years' value.
                    TransfersFormFormValid = false;
                } else {
                    document.getElementById("ScheduledTransferEndingYearsTextbox").style.outline = "none";
                }

                // end after how many occcurences
                if ($("#ScheduledTransferEndingXoccurencesRadio").is(":checked") && ($("#ScheduledTransferEndingOccurencesTextbox").val() === "" ||
                    $("#ScheduledTransferEndingOccurencesTextbox").val() < 1)) {
                    document.getElementById("ScheduledTransferEndingOccurencesTextbox").style.outline = "1px solid red";
                    $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEndingEnterHowManyOccurrencesText);    //Please enter an 'end after how many occurences' value.
                    TransfersFormFormValid = false;
                } else if ($("#ScheduledTransferEndingXoccurencesRadio").is(":checked") && $("#ScheduledTransferEndingOccurencesTextbox").val() >= 1) {
                    // validate the maximum occurance from the configs:
                    var maximumEndAfterNumber = TransfersReactModule.getMaximumEndAfterOccurrenceCount($("#ScheduledTransferFrequencySelect").val());

                    if (maximumEndAfterNumber !== null && parseInt($("#ScheduledTransferEndingOccurencesTextbox").val()) > maximumEndAfterNumber) {
                        document.getElementById("ScheduledTransferEndingOccurencesTextbox").style.outline = "1px solid red";
                        $("#TransfersValidationDiv").append("<br>&bull; " + HomeBanking.Utilities.String.Format("Occurrences is invalid or exceeds {0} occurrences", maximumEndAfterNumber));
                        TransfersFormFormValid = false;
                    }
                } else {
                    document.getElementById("ScheduledTransferEndingOccurencesTextbox").style.outline = "none";
                }
            }

            // end on date
            if ($("#ScheduledTransferEndingByDateRadio").is(":checked") && $("#ScheduledTransferEndingDateTextbox").val() === "") {
                document.getElementById("ScheduledTransferEndingDateTextbox").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEndingEndingDateText);    //Please enter an ending date.
                TransfersFormFormValid = false;
                // valid date
            } else if ($("#ScheduledTransferEndingByDateRadio").is(":checked") && !Date.parse(TransfersFormBlob.ScheduledTransferEndingDateTextbox.value)) {
                document.getElementById("ScheduledTransferEndingDateTextbox").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEndingValidEndingDateText);    //Please enter a valid ending date (mm/dd/yyyy format).
                TransfersFormFormValid = false;
                // check to see if the chosen end date is in the future in relation to the start date. Since end date doesn't have a time, we ignore time for start date comparison
            } else if ($("#ScheduledTransferEndingByDateRadio").is(":checked")
                && Date.parse(TransfersFormBlob.ScheduledTransferEndingDateTextbox.value) < Date.parse(TransfersFormBlob.ScheduledTransferBeginningDateTextbox.value)) {
                document.getElementById("ScheduledTransferEndingDateTextbox").style.outline = "1px solid red";
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.validationMessageEndingDateNotBeforeBeginningDateText);    //Please enter an ending date that occurs after the beginning date.
                TransfersFormFormValid = false;
            } else {
                document.getElementById("ScheduledTransferEndingDateTextbox").style.outline = "none";
            }
        } // end recurring bill pay validation


        // If 'from' credit card has insufficient funds:
        if (TransfersReactObject.Settings.cashAdvanceConfigSettings.cashAdvanceFromCreditCardsEnabled.toLocaleLowerCase() === "true" && _selectedFromAccountIsInternalCreditCard) {
            var flatFee = parseInt(TransfersReactObject.Settings.cashAdvanceConfigSettings.cashAdvanceFromCreditCardsMinimumTransactionCost);
            var percentageFee = (parseInt(TransfersReactObject.Settings.cashAdvanceConfigSettings.cashAdvanceFromCreditCardsAdvanceFeePercentage) * .01) * parseFloat($("#TransferAmountTextbox").val());
            var largerFee = (flatFee > percentageFee ? flatFee : percentageFee);

            if (((largerFee + parseFloat($("#TransferAmountTextbox").val())) * 100) > parseFloat(_selectedFromAccount.available)) {        // amount available is in cents
                // insufficient funds: warn the user and prevent the transaction        
                $("#transferProgressDiv").slideUp();
                $("#confirmTransferDescriptionDiv").slideUp();
                $("#transferConfirmButton").hide();
                $("#transferCancelButton").prop("disabled", false);

                document.getElementById("TransfersFromSelect").style.outline = "1px solid red";
                $("#TransfersValidationDiv").empty();
                $("#TransfersValidationDiv").html("Insufficient Funds Warning:");
                $("#TransfersValidationDiv").append("<br>&bull; " + TransfersReactObject.Settings.Literals.cashAdvanceInsufficientFundsWarningText);
                TransfersFormFormValid = false;
            } else {
                document.getElementById("TransfersFromSelect").style.outline = "none";
            }
        }

        // check for anything that may have failed above
        if (TransfersFormFormValid === false) {
            $("#TransfersValidationDiv").slideDown();
            $("#TransfersValidationDiv").focus();
            $("#AddPaymentSubmitButton").prop("disabled", false);
            return false;
        }

        // Form is Valid: show modal:
        $("#TransfersValidationDiv").hide();
        $("#TransfersErrorDiv").hide();
        $("#TransfersSuccessDiv").hide();

        // show the transfer confirmation modal since the form is valid:
        TransfersReactModule.showTransferConfirmationModal()
    }


    // validate the transfer form from button key press if the key was the ENTER key. (ADA Compliance)
    const _validateScheduledTransferFormFromKeyPress = (e) => {
        var currTarget = e.target;

        if (e.key === "Enter") {
            _validateScheduledTransferForm(false)
        }
    }


    // submit the transfer to Ajax:
    const _submitTransferForm = () => {
        //console.log("Got here: _submitTransferForm()");

        $("#transferProgressDiv").slideDown();

        // transfer data to send to the API:
        var TransfersFormBlob = document.getElementById("TransfersForm");
        var scheduledTransferFrequencyType = TransfersFormBlob.ScheduledTransferFrequencySelect.value;

        //set up scheduled transfer object
        var addUpdateRequest = {};
        var scheduledTransfer = { IsActive: true };
        var scheduledEvent = {};

        // add the scheduledEvent object to the scheduledTranfer object
        scheduledTransfer.ScheduledEvent = scheduledEvent;
        scheduledTransfer.ScheduledEvent.EventType = 1;     // 1 = transfer type

        if ($("#ScheduledTransferCheckbox").is(":checked")) {
            // starting date;
            scheduledTransfer.ScheduledEvent.StartTimeUtc = new Date(TransfersFormBlob.ScheduledTransferBeginningDateTextbox.value);
            scheduledTransfer.ScheduledEvent.NextRunTimeUtc = scheduledTransfer.ScheduledEvent.StartTimeUtc;

            // ending date/occurance data:
            var scheduledTransferEndDate = {};

            if (scheduledTransferFrequencyType !== "none") {
                if ($("#ScheduledTransferEndingInYearsRadio").is(":checked")) {
                    var yearsInt = parseInt(TransfersFormBlob.ScheduledTransferEndingYearsTextbox.value);
                    var endingDate = new Date(Date.parse(TransfersFormBlob.ScheduledTransferBeginningDateTextbox.value));
                    endingDate = endingDate.setFullYear(endingDate.getFullYear() + yearsInt);
                    scheduledTransfer.ScheduledEvent.EndTimeUtc = new Date(endingDate);
                } else if ($("#ScheduledTransferEndingXoccurencesRadio").is(":checked")) {
                    scheduledTransfer.ScheduledEvent.MaxOccurences = parseInt(TransfersFormBlob.ScheduledTransferEndingOccurencesTextbox.value);
                } else if ($("#ScheduledTransferEndingByDateRadio").is(":checked")) {
                    scheduledTransfer.ScheduledEvent.EndTimeUtc = new Date(TransfersFormBlob.ScheduledTransferEndingDateTextbox.value);
                } else if ($("#ScheduledTransferEndingNoEndRadio").is(":checked")) {
                    scheduledTransfer.ScheduledEvent.EndTimeUtc = null;         // NoEndDate  
                }
            }   // end date/occurance

            // one time only data:
            if (scheduledTransferFrequencyType === _scheduledFrequencyEnum.ONE_TIME) {
                scheduledTransfer.ScheduledEvent.RecurrenceType = 0;      // OneTime = undefined   Daily = 0    from Jacob "no, just set it to daily. RecurrenceType can't be null"
                scheduledTransfer.ScheduledEvent.MaxOccurences = 1;
            }   // end one time only form data

            // daily data:
            if (scheduledTransferFrequencyType === _scheduledFrequencyEnum.DAILY) {
                if ($("#ScheduledTransferDailyXdaysRadio").is(":checked")) {
                    scheduledTransfer.ScheduledEvent.Interval = parseInt(TransfersFormBlob.ScheduledTransferBeginningTextbox.value);
                    scheduledTransfer.ScheduledEvent.RecurrenceType = 0;         // Daily = 0    Weekly = 1   
                } else if ($("#ScheduledTransferDailyWeekdayRadio").is(":checked")) {
                    scheduledTransfer.ScheduledEvent.DayOfWeekMask = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];         // List<DayOfWeek>
                    scheduledTransfer.ScheduledEvent.RecurrenceType = 1;         // Daily = 0    Weekly = 1    from Jacob "This actually needs to use the weekly recurrence type."
                }
            }   // end daily form data

            // weekly data:
            if (scheduledTransferFrequencyType === _scheduledFrequencyEnum.WEEKLY) {
                var weekMask = [];

                if ($("#ScheduledTransferWeeklyMondayCheckbox").is(":checked")) { weekMask.push("Monday") };
                if ($("#ScheduledTransferWeeklyTuesdayCheckbox").is(":checked")) { weekMask.push("Tuesday") };
                if ($("#ScheduledTransferWeeklyWednesdayCheckbox").is(":checked")) { weekMask.push("Wednesday") };
                if ($("#ScheduledTransferWeeklyThursdayCheckbox").is(":checked")) { weekMask.push("Thursday") };
                if ($("#ScheduledTransferWeeklyFridayCheckbox").is(":checked")) { weekMask.push("Friday") };

                scheduledTransfer.ScheduledEvent.DayOfWeekMask = weekMask;
                scheduledTransfer.ScheduledEvent.Interval = parseInt(TransfersFormBlob.ScheduledTransferWeeklyTextbox.value);
                scheduledTransfer.ScheduledEvent.RecurrenceType = 1;         // Weekly = 1
            }   // end weekly form data

            // twice monthly data:
            if (scheduledTransferFrequencyType === _scheduledFrequencyEnum.TWICE_MONTHLY) {
                if ($("#ScheduledTransferTwiceMonthlyChosenDaysRadio").is(":checked")) {
                    scheduledTransfer.ScheduledEvent.DayOfMonth = parseInt(TransfersFormBlob.ScheduledTransferTwiceMonthlyBeginningDayTextbox.value);
                    scheduledTransfer.ScheduledEvent.SecondDayOfMonth = parseInt(TransfersFormBlob.ScheduledTransferTwiceMonthlyConcludingDayTextbox.value);
                    scheduledTransfer.ScheduledEvent.Interval = parseInt(TransfersFormBlob.ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox.value);
                } else if ($("#ScheduledTransferTwiceMonthly15thAndLastDayRadio").is(":checked")) {
                    scheduledTransfer.ScheduledEvent.DayOfMonth = 15;
                    scheduledTransfer.ScheduledEvent.SecondDayOfMonth = 31;
                    scheduledTransfer.ScheduledEvent.Interval = parseInt(TransfersFormBlob.ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox.value);   // OnFifteenthAndLastDayOfMonth = 1
                }
                scheduledTransfer.ScheduledEvent.RecurrenceType = 4;         // Twice Monthly = 4
            }   // end twice monthly form data

            // monthly data:
            if (scheduledTransferFrequencyType === _scheduledFrequencyEnum.MONTHLY) {
                if ($("#ScheduledTransferMonthlyChosenDaysRadio").is(":checked")) {
                    scheduledTransfer.ScheduledEvent.DayOfMonth = parseInt(TransfersFormBlob.ScheduledTransferMonthlyBeginningDayTextbox.value);
                    scheduledTransfer.ScheduledEvent.Interval = parseInt(TransfersFormBlob.ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox.value);
                    scheduledTransfer.ScheduledEvent.RecurrenceType = 2;         // Monthly = 2
                } else if ($("#ScheduledTransferMonthlyLastDayRadio").is(":checked")) {
                    scheduledTransfer.ScheduledEvent.DayOfMonth = 31;
                    scheduledTransfer.ScheduledEvent.Interval = parseInt(TransfersFormBlob.ScheduledTransferMonthlyLastDayTextbox.value);
                    scheduledTransfer.ScheduledEvent.RecurrenceType = 2;         // Monthly = 2
                } else if ($("#ScheduledTransferMonthlyMonthNthRadio").is(":checked")) {
                    scheduledTransfer.ScheduledEvent.Instance = parseInt(TransfersFormBlob.ScheduledTransferMonthlyMonthlyNthEnumerationSelect.value);
                    scheduledTransfer.ScheduledEvent.Interval = parseInt(TransfersFormBlob.ScheduledTransferMonthlyMonthlyNthTextbox.value);

                    var weekMask = [];

                    if ($("#ScheduledTransferMonthlyMondayCheckbox").is(":checked")) { weekMask.push("Monday") };
                    if ($("#ScheduledTransferMonthlyTuesdayCheckbox").is(":checked")) { weekMask.push("Tuesday") };
                    if ($("#ScheduledTransferMonthlyWednesdayCheckbox").is(":checked")) { weekMask.push("Wednesday") };
                    if ($("#ScheduledTransferMonthlyThursdayCheckbox").is(":checked")) { weekMask.push("Thursday") };
                    if ($("#ScheduledTransferMonthlyFridayCheckbox").is(":checked")) { weekMask.push("Friday") };

                    scheduledTransfer.ScheduledEvent.DayOfWeekMask = weekMask;
                    scheduledTransfer.ScheduledEvent.RecurrenceType = 3;         // MonthlyNth = 3
                }
            }   // end monthly form data



            // yearly data:
            if (scheduledTransferFrequencyType === _scheduledFrequencyEnum.YEARLY) {
                if ($("#ScheduledTransferYearlySelectMonthRadio").is(":checked")) {
                    scheduledTransfer.ScheduledEvent.MonthOfYear = parseInt(TransfersFormBlob.ScheduledTransferYearlyMonthSelect.value);
                    scheduledTransfer.ScheduledEvent.DayOfMonth = parseInt(TransfersFormBlob.ScheduledTransferYearlyDayTextbox.value);
                    scheduledTransfer.ScheduledEvent.Interval = 1;
                    scheduledTransfer.ScheduledEvent.RecurrenceType = 5;         // Yearly = 5
                } else if ($("#ScheduledTransferYearlyDayOfMonthRadio").is(":checked")) {
                    scheduledTransfer.ScheduledEvent.Instance = parseInt(TransfersFormBlob.ScheduledTransferYearlyNumberEnumerationSelect.value);
                    scheduledTransfer.ScheduledEvent.DayOfWeekMask = [TransfersFormBlob.ScheduledTransferYearlyWeekdayEnumerationSelect.value];
                    scheduledTransfer.ScheduledEvent.MonthOfYear = parseInt(TransfersFormBlob.ScheduledTransferYearlyMonth2Select.value);
                    scheduledTransfer.ScheduledEvent.Interval = 1;
                    scheduledTransfer.ScheduledEvent.RecurrenceType = 5;         // Yearly = 5
                } else if ($("#ScheduledTransferYearlyYearlyNthRadio").is(":checked")) {
                    var weekMask = [];

                    if ($("#ScheduledTransferYearlyNthMondayCheckbox").is(":checked")) { weekMask.push("Monday") };
                    if ($("#ScheduledTransferYearlyNthTuesdayCheckbox").is(":checked")) { weekMask.push("Tuesday") };
                    if ($("#ScheduledTransferYearlyNthWednesdayCheckbox").is(":checked")) { weekMask.push("Wednesday") };
                    if ($("#ScheduledTransferYearlyNthThursdayCheckbox").is(":checked")) { weekMask.push("Thursday") };
                    if ($("#ScheduledTransferYearlyNthFridayCheckbox").is(":checked")) { weekMask.push("Friday") };

                    scheduledTransfer.ScheduledEvent.Instance = parseInt(TransfersFormBlob.ScheduledTransferYearlyNthEnumerationSelect.value);
                    scheduledTransfer.ScheduledEvent.MonthOfYear = parseInt(TransfersFormBlob.ScheduledTransferYearlyNthMonthSelect.value);
                    scheduledTransfer.ScheduledEvent.Interval = parseInt(TransfersFormBlob.ScheduledTransferYearlyNthTextbox.value);
                    scheduledTransfer.ScheduledEvent.DayOfWeekMask = weekMask;
                    scheduledTransfer.ScheduledEvent.RecurrenceType = 6;         // YearlyNth = 6
                }
            }   // end yearly form data
        }   // end rucurring data collection process


        var additionalToPrincipal;    // backend is looking for a string for this property for regular transfers, but a boolean for scheduled transfers
        var principalOnly;

        if (($("#AdditionalToPrincipalDiv").is(":visible") || _additionalToPrincipalShouldBeOpen) && $("#AdditionalToPrincipalCheckbox").is(":checked")) {
            additionalToPrincipal = "true";
            principalOnly = false;
        } else {
            additionalToPrincipal = "false";
            principalOnly = true;
        }

        var submitApiUrl;
        var isScheduledTransfer;
        var transferData;

        if (!$("#ScheduledTransferCheckbox").is(":checked")) {      // regular transfer
            var fromAccount;
            var toAccount;

            if (_selectedFromAccount.slType === "LINKED") {
                fromAccount = _selectedFromAccount.achID ? _selectedFromAccount.achID : null;
            } else {
                fromAccount = _selectedFromAccount.accountNumber ? _selectedFromAccount.accountNumber : null;
            }

            if (_selectedToAccount.slType === "LINKED") {
                toAccount = _selectedToAccount.achID ? _selectedToAccount.achID : null;
            } else {
                toAccount = _selectedToAccount.account ? _selectedToAccount.account : null;
            }

            isScheduledTransfer = false;
            submitApiUrl = HomeBanking.BASE_URL + "api/transfers/perform-olb-transfer";
            transferData = {
                SaveTransfer: false,
                Amount: HomeBanking.Utilities.Currency.ParseDollarsToCents(TransfersFormBlob.TransferAmountTextbox.value),
                ExtraToPrinciple: additionalToPrincipal,
                FeeSubType: (_selectedFeeAccount && _selectedFeeAccount.slType ? _selectedFeeAccount.slType : null),
                FeeSuffix: (_selectedFeeAccount && _selectedFeeAccount.suffix ? _selectedFeeAccount.suffix : null),
                FromAccount: fromAccount,
                FromHouseholdingAccountId: parseInt(_selectedFromAccount.householdingAccountId) > 0 ? _selectedFromAccount.householdingAccountId : "0",
                FromSubType: _selectedFromAccount.slType,
                FromSuffix: _selectedFromAccount.suffix,
                IRATaxYear: (!TransfersFormBlob.IraContributionYearSelect.value === "none" ? TransfersFormBlob.IraContributionYearSelect.value : new Date().getFullYear()),
                ToAccount: toAccount,
                ToHouseholdingAccountId: parseInt(_selectedToAccount.householdingAccountId) > 0 ? _selectedToAccount.householdingAccountId : "0",
                ToSubType: _selectedToAccount.slType,
                ToSuffix: _selectedToAccount.suffix,
                TransferDescription: (TransfersFormBlob.TransferDescriptionTextbox.value ? TransfersFormBlob.TransferDescriptionTextbox.value : null)
            }
        } else {        // scheduled transfer
            isScheduledTransfer = true;
            submitApiUrl = HomeBanking.BASE_URL + "api/scheduled-transfers/add-update-transfer";

            // set up transfer type ... Internal, External (ach transfers), CreditCard
            var transferType = "Internal";

            if (_selectedFromAccount.slType === "LINKED" || _selectedToAccount.slType === "LINKED") {
                transferType = "External";
            }

            if (_selectedToAccount.slType === "CREDIT") {
                transferType = "CreditCard";
            }

            scheduledTransfer.AmountInCents =
                HomeBanking.Utilities.Currency.ParseDollarsToCents(TransfersFormBlob.TransferAmountTextbox.value);
            scheduledTransfer.ExtraToPrincipal = (additionalToPrincipal.toLowerCase() === "true");
            scheduledTransfer.PrincipalOnly = principalOnly;
            scheduledTransfer.FromAccount = _selectedFromAccount.isCrossAccount ? _selectedFromAccount.account : 0;
            scheduledTransfer.FromAccountCategory = _selectedFromAccount.category;
            scheduledTransfer.FromAccountDescription = _selectedFromAccount.description;
            scheduledTransfer.FromAccountType = _selectedFromAccount.slType;
            scheduledTransfer.FromAccountSuffix = _selectedFromAccount.suffix;
            scheduledTransfer.FromHouseholdingAccountId = (_selectedFromAccount.householdingAccountId && _selectedFromAccount.householdingAccountId.length > 0 && parseInt(_selectedFromAccount.householdingAccountId) > 0) ? parseInt(_selectedFromAccount.householdingAccountId) : 0;
            scheduledTransfer.ToAccount = _selectedToAccount.isCrossAccount ? _selectedToAccount.account : 0;
            scheduledTransfer.ToAccountCategory = _selectedToAccount.category;
            scheduledTransfer.ToAccountType = _selectedToAccount.slType;
            scheduledTransfer.ToAccountSuffix = _selectedToAccount.suffix;
            scheduledTransfer.ToHouseholdingAccountId = (_selectedToAccount.householdingAccountId && _selectedToAccount.householdingAccountId.length > 0 && parseInt(_selectedToAccount.householdingAccountId) > 0) ? parseInt(_selectedToAccount.householdingAccountId) : 0;
            scheduledTransfer.FeeAccountDescription = (_selectedFeeAccount && _selectedFeeAccount.householdingAccountId ? _selectedFeeAccount.householdingAccountId : null);
            scheduledTransfer.FeeAccountType = (_selectedFeeAccount && _selectedFeeAccount.slType ? _selectedFeeAccount.slType : null);
            scheduledTransfer.FeeAccountSuffix = (_selectedFeeAccount && _selectedFeeAccount.suffix ? _selectedFeeAccount.suffix : null);
            scheduledTransfer.TransferName = TransfersFormBlob.ScheduledTransferDescriptionTextbox.value;
            scheduledTransfer.TransferType = transferType;

            addUpdateRequest.ScheduledTransfer = scheduledTransfer;
            transferData = addUpdateRequest;
        }

        console.log("transferData: ", transferData);

        $.ajax({
            url: submitApiUrl,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(transferData),
            success: function (data) {
                console.log("data: ", data);


                if (!isScheduledTransfer) {     // regular transfer
                    if ((typeof data !== "undefined" || data !== null) && $.isPlainObject(data)) {
                        TransfersReactModule.transferSuccessHandler(transferData, _selectedFromAccount, _selectedToAccount, data);
                    } else {
                        TransfersReactModule.transferFailureHandler();
                    }
                } else {       // scheduled transfer
                    if (data === true) {
                        TransfersReactModule.scheduledTransferSuccessHandler(transferData.ScheduledTransfer, _selectedFromAccount, _selectedToAccount);
                    } else {
                        TransfersReactModule.scheduledTransferFailureHandler();
                    }
                }
            },
            error: function (xhr, err) {
                var terseError = $.parseJSON(xhr.responseText);
                var humanErrorMessage = typeof terseError.exceptionMessage === "undefined" ? terseError.message : terseError.exceptionMessage;


                $("#transferFailedDiv").html(humanErrorMessage + " Please try again later.");
                $("#transferFailedDiv").slideDown();
                $("#transferFailedDiv").focus();
                $("#transferProgressDiv").hide();
                $("#transferConfirmButton").hide();
            }
        });
    }


    // submit the transfer to Ajax from Key press (ADA Compliance):
    const _submitTransferFormFromKeyPress = (e) => {
        var currTarget = e.target;

        if (e.key === "Enter") {
            _submitTransferForm()
        }
    }


    // show transfer confirmation modal:
    const _showTransferConfirmationModal = () => {
        //console.log("Got here: _showTransferConfirmationModal()");

        $("#TransferConfirmationModal").modal({
            backdrop: 'static', // to prevent closing by clicking the dark grey background surrounding the modal
            keyboard: false // to prevent closing with Esc button  
        });
        setTimeout(_setTransferConfirmationModalDetails, 50);     // we must use a timeout because the modal doesn't exist yet when first invoked.
    }


    // set the modal's details:
    const _setTransferConfirmationModalDetails = () => {
        // console.log("Got here: _setTransferConfirmationModalDetails()");

        var TransfersFormBlob = document.getElementById("TransfersForm");
        var transferDescription = TransfersFormBlob.TransferDescriptionTextbox.value;
        var transferAmount = HomeBanking.Utilities.Currency.ParseDollarsToCents(TransfersFormBlob.TransferAmountTextbox.value);
        var additionalMessage = "";
        var isScheduledTransfer = $("#ScheduledTransferCheckbox").is(":checked");

        // reset this modal:
        document.getElementById("transferProgressDiv").style.display = "none";
        document.getElementById("transferSuccessDiv").style.display = "none";
        document.getElementById("transferSuccessDiv").innerText = "";
        document.getElementById("transferFailedDiv").style.display = "none";
        document.getElementById("transferFailedDiv").innerText = "";
        document.getElementById("transferCompletedDetailsDiv").style.display = "none";
        document.getElementById("transferCompletedDetailsDiv").innerText = "";
        document.getElementById("cashAdvanceInsufficientFundsWarningDiv").style.display = "none";
        document.getElementById("cashAdvanceInsufficientFundsWarningDiv").innerText = "";

        $("#transferCancelButton").show();
        $("#transferCancelButton").prop("disabled", false);
        $("#transferConfirmButton").show();
        $("#transferConfirmButton").prop("disabled", false);
        $("#transferPrintButton").hide();
        $("#transferDismissButton").hide();

        if (!isScheduledTransfer && _selectedToAccount.slType === "CREDIT" && TransfersReactObject.Settings.Literals.transferConfirmCardAdditionalMessageText && TransfersReactObject.Settings.Literals.TransferConfirmCardAdditionalMessage.length > 0) {
            additionalMessage += " " + TransfersReactObject.Settings.Literals.transferConfirmCardAdditionalMessageText;
        }

        if (!isScheduledTransfer && isFinite(Number(_selectedFromAccount.remainingFreeTransfersFrom)) && Number(_selectedFromAccount.remainingFreeTransfersFrom) > 0) {
            additionalMessage += "<br><br>" + HomeBanking.Utilities.String.Format(TransfersReactObject.Settings.Literals.remainingFreeTransfersFromConfirmMessageText, Number(_selectedFromAccount.remainingFreeTransfersFrom));
        }

        if (!isScheduledTransfer && isFinite(Number(_selectedToAccount.remainingFreeTransfersTo)) && Number(_selectedToAccount.remainingFreeTransfersTo) > 0) {
            additionalMessage += "<br><br>" + HomeBanking.Utilities.String.Format(TransfersReactObject.Settings.Literals.remainingFreeTransfersToConfirmMessageText, Number(_selectedToAccount.remainingFreeTransfersTo));
        }

        if (!isScheduledTransfer && _selectedToAccount.slType === "LOAN" && isFinite(Number(_selectedToAccount.payment)) && transferAmount < Number(_selectedToAccount.payment)) {
            if (_selectedToAccount.dueDate) {
                var formattedDate = _formatDate(_selectedToAccount.dueDate);
                additionalMessage += "<br><br>" + HomeBanking.Utilities.String.Format(TransfersReactObject.Settings.Literals.warningLowPaymentAmountText, HomeBanking.Utilities.Currency.FormatCentsToDollars(_selectedToAccount.payment), formattedDate);

            } else {
                additionalMessage += "<br><br>" + HomeBanking.Utilities.String.Format(TransfersReactObject.Settings.Literals.warningLowPaymentAmountNoKnownDueDateText, HomeBanking.Utilities.Currency.FormatCentsToDollars(_selectedToAccount.payment));
            }
        }

        // populate the message to the DOM
        document.getElementById("confirmTransferDescriptionDiv").innerHTML = HomeBanking.Utilities.String.Format(
            (isScheduledTransfer ? TransfersReactObject.Settings.Literals.scheduledTransferConfirmMessageText : TransfersReactObject.Settings.Literals.regularTransferConfirmMessageText),
            HomeBanking.Utilities.Currency.FormatCentsToDollars(transferAmount),
            _selectedFromAccount.longDescription,
            _selectedToAccount.longDescription
        ) +
            additionalMessage


        // Cash Advance warning check:
        if (TransfersReactObject.Settings.cashAdvanceConfigSettings.cashAdvanceFromCreditCardsEnabled.toLocaleLowerCase() === "true" && _selectedFromAccountIsInternalCreditCard) {
            document.getElementById("cashAdvanceWarningMessageDiv").innerHTML = HomeBanking.Utilities.String.Format(HomeBanking.Controls.Dashboard.Transfers.Resources.cashAdvanceWarningMessage,
                _cashAdvanceFromCreditCardsAdvanceFeePercentage, _cashAdvanceFromCreditCardsMinimumTransactionCost);
            document.getElementById("cashAdvanceWarningDiv").style.display = "block";
            document.getElementById("confirmTransferDescriptionDiv").style.display = "none";
            document.getElementById("confirmTransferModalFooter").style.display = "none";
        } else {
            document.getElementById("cashAdvanceWarningDiv").style.display = "none";
            document.getElementById("confirmTransferDescriptionDiv").style.display = "block";
            document.getElementById("confirmTransferModalFooter").style.display = "block";
        }

        if (isScheduledTransfer) {
            if (transferDescription && transferDescription.length > 0) {
                document.getElementById("descTransferDescription").innerText = transferDescription;
                document.getElementById("descTransferDescription").style.display = "block";
                document.getElementById("dtTransferDescriptionConfirm").style.display = "block";
            } else {
                document.getElementById("descTransferDescription").style.display = "none";
                document.getElementById("dtTransferDescriptionConfirm").style.display = "none";
            }


            document.getElementById("descScheduledTransferDescription").innerText = $("#ScheduledTransferDescriptionTextbox").val();
            document.getElementById("descScheduledTransferFrequency").innerText = _scheduledTransferFrequencyHumanReadable();
            document.getElementById("descScheduledTransferBeginning").innerText = $("#ScheduledTransferBeginningDateTextbox").val();
            document.getElementById("descScheduledTransferEnding").innerText = _scheduledTransferEndTimeHumanReadable();

            //Cash Advance warning check:
            if (TransfersReactObject.Settings.cashAdvanceConfigSettings.cashAdvanceFromCreditCardsEnabled.toLocaleLowerCase() === "true" && _selectedFromAccountIsInternalCreditCard) {
                document.getElementById("dlScheduledTransferDetails").style.display = "none";
            } else {
                document.getElementById("dlScheduledTransferDetails").style.display = "block";
            }

            document.getElementById("transferConfirmButton").value = TransfersReactObject.Settings.Literals.buttonScheduledTransferText;
        } else {
            document.getElementById("dlScheduledTransferDetails").style.display = "none";
            document.getElementById("transferConfirmButton").value = TransfersReactObject.Settings.Literals.buttonRegularTransferText;
        }

        // Try to bring focus to the modal in case they reached it by a keypress:
        window.TransfersConfirmModalComponent.bringToFocus();
    }


    // returns Human-readable string for scheduled transfer frequency.
    const _scheduledTransferFrequencyHumanReadable = () => {
        var frequency = $("#ScheduledTransferFrequencySelect").val();
        var resultString = $("#ScheduledTransferFrequencySelect").find("option:selected").text();

        if (_isTransferOccurrencePatternDisabled(frequency)) {
            // Occurrence pattern disabled, just return the frequency
            return resultString;
        }

        // Occurrence pattern not disabled, continue and return information on occurrence pattern
        switch (frequency) {
            case _scheduledFrequencyEnum.ONE_TIME:     // One Time Occurance
                // nothing to add, the text from the drop-down already reads 'One Time Occurance' and is already in resultString				 
                break;

            case _scheduledFrequencyEnum.DAILY:     // DAILY
                resultString += " - ";
                if ($("#ScheduledTransferDailyWeekdayRadio").is(":checked")) {
                    resultString += "Every weekday";
                } else if ($("#ScheduledTransferDailyXdaysRadio").is(":checked")) {
                    resultString += "Every " + $("#ScheduledTransferBeginningTextbox").val() + " days";
                }
                break;

            case _scheduledFrequencyEnum.WEEKLY:     // WEEKLY
                var counter = 1;
                resultString += " - Every " + $("#ScheduledTransferWeeklyTextbox").val() + " weeks on ";
                $("#weeklyOccuranceDiv").find("input[id*=ScheduledTransferWeekly]:checked").each(function () {
                    resultString += $("#weeklyOccuranceDiv").find("label[for='" + $(this).attr("id") + "']").text() + ", ";
                });
                resultString = resultString.substr(0, resultString.length - 2);
                break;

            case _scheduledFrequencyEnum.TWICE_MONTHLY:     // TWICE MONTHLY
                resultString += " - ";
                if ($("#ScheduledTransferTwiceMonthlyChosenDaysRadio").is(":checked")) {
                    resultString += "On day " + $("#ScheduledTransferTwiceMonthlyBeginningDayTextbox").val() + " and day ";
                    resultString += $("#ScheduledTransferTwiceMonthlyConcludingDayTextbox").val() + " every ";
                    resultString += $("#ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox").val() + " month(s)";
                } else if ($("#ScheduledTransferTwiceMonthly15thAndLastDayRadio").is(":checked")) {
                    resultString += "On day 15 and the last day of the month every ";
                    resultString += $("#ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox").val() + " month(s)";
                }
                break;

            case _scheduledFrequencyEnum.MONTHLY:     // MONTHLY
                resultString += " - ";
                if ($("#ScheduledTransferMonthlyMonthNthRadio").is(":checked")) {
                    resultString += "The " + $("#ScheduledTransferMonthlyMonthlyNthEnumerationSelect").find("option:selected").text().toLocaleLowerCase() + " ";
                    $("#monthlyWeekdayOccuranceDiv").find("input[id*=ScheduledTransferMonthly]:checked").each(function () {
                        resultString += $("#monthlyWeekdayOccuranceDiv").find("label[for='" + $(this).attr("id") + "']").text() + ", ";
                    });
                    resultString += " every " + $("#ScheduledTransferMonthlyMonthlyNthTextbox").val() + " month(s)";
                } else if ($("#ScheduledTransferMonthlyChosenDaysRadio").is(":checked")) {
                    resultString += "On day " + $("#ScheduledTransferMonthlyBeginningDayTextbox").val() + " every " + $("#ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox").val() + " month(s)";
                } else if ($("#ScheduledTransferMonthlyLastDayRadio").is(":checked")) {
                    resultString += "On the last day of the month every ";
                    resultString += $("#ScheduledTransferMonthlyLastDayTextbox").val() + " month(s)";
                }
                break;

            case _scheduledFrequencyEnum.YEARLY:     // YEARLY     
                resultString += " - ";
                if ($("#ScheduledTransferYearlySelectMonthRadio").is(":checked")) {
                    resultString += "Every " + $("#ScheduledTransferYearlyMonthSelect").find("option:selected").text() + " " + $("#ScheduledTransferYearlyDayTextbox").val();
                } else if ($("#ScheduledTransferYearlyDayOfMonthRadio").is(":checked")) {
                    resultString += "On the " + $("#ScheduledTransferYearlyNumberEnumerationSelect").find("option:selected").text().toLocaleLowerCase() + " ";
                    resultString += $("#ScheduledTransferYearlyWeekdayEnumerationSelect").find("option:selected").text() +
                        " of " + $("#ScheduledTransferYearlyMonth2Select").find("option:selected").text();
                } else if ($("#ScheduledTransferYearlyYearlyNthRadio").is(":checked")) {
                    resultString += "On the " + $("#ScheduledTransferYearlyNthEnumerationSelect").find("option:selected").text().toLocaleLowerCase() + " ";
                    $("#yearlyWeekdayOccuranceDiv").find("input[id*=ScheduledTransferYearlyNth]:checked").each(function () {
                        resultString += $("#yearlyWeekdayOccuranceDiv").find("label[for='" + $(this).attr("id") + "']").text() + ", ";
                    });
                    resultString += "of " + $("#ScheduledTransferYearlyNthMonthSelect").find("option:selected").text() +
                        " every " + $("#ScheduledTransferYearlyNthTextbox").val() + " year(s)";
                }
                break;
        }

        return resultString;
    };


    // Returns a human-readable string for the scheduled transfer end time.
    const _scheduledTransferEndTimeHumanReadable = () => {
        if ($("#ScheduledTransferFrequencySelect").val() === _scheduledFrequencyEnum.ONE_TIME) {
            return $("#ScheduledTransferBeginningDateTextbox").val();
        } else if ($("#ScheduledTransferEndingInYearsRadio").is(":checked")) {
            return "In " + $("#ScheduledTransferEndingYearsTextbox").val() + " year(s)";
        } else if ($("#ScheduledTransferEndingXoccurencesRadio").is(":checked")) {
            return "End after " + $("#ScheduledTransferEndingOccurencesTextbox").val() + " occurences";
        } else if ($("#ScheduledTransferEndingByDateRadio").is(":checked")) {
            return "End on " + $("#ScheduledTransferEndingDateTextbox").val();
        } else if ($("#ScheduledTransferEndingNoEndRadio").is(":checked")) {
            return "No end date";
        }
    };


    // Used to check if the specified scheduled transfer type's occurrence pattern is globally disabled. returns {boolean} Whether the specified frequency's occurrence pattern is disabled.
    const _isTransferOccurrencePatternDisabled = (transferType) => {
        if (TransfersReactObject.Settings.transferConfiguration === null || !$.isArray(TransfersReactObject.Settings.transferConfiguration.ScheduledTransferDisabledPatterns)) {
            return false;
        }

        var result = false;
        var currSelectedTransferType = $("#ScheduledTransferFrequencySelect").val();

        $.each(TransfersReactObject.Settings.transferConfiguration.ScheduledTransferDisabledPatterns, function (iIndex, oDisabledPattern) {
            if (oDisabledPattern.ScheduledTransferType === currSelectedTransferType) {
                result = true;
            }
        });

        return result;
    };


    // THIS FEATURE IS NOT INTRODUCED TO SCHEDULED TRANSFERS 2 AT THIS TIME!
    // HOWEVER, IT MAY BECOME PART OF THIS FEATURE IN THE FUTURE IF THE UX GROUP OR A CLIENT APPROVES AND PAYS FOR IT
    // THIS IS ALL JUST USING MOCKED UP DATA - MORE WILL WILL HAVE TO BE DONE WITH REAL DATA AFTER A SCHEDULED EVENT TRANSFER IS RETRIEVED FROM THE DB
    //
    //
    //
    // set the modal to 'edit' mode
    //const _setTransfersModalModeToEdit = () => {
    //	TransfersModalComponent.setMode("edit", _currPayee);

    //	// attach datepicker to ending date input
    //	$("#BillPayDeliverPaymentByTextbox").datepicker({
    //		autoSize: true,
    //		dateFormat: "mm/dd/yy",
    //		maxDate: "+60d",
    //		minDate: "-0d",
    //		onSelect: function () { } /* workaround for IE validator bug */
    //	});

    //	document.getElementById("TransferAmountTextbox").value = _currPayment.amount.totalCents / 100;
    //	document.getElementById("BillPayDeliverPaymentByTextbox").value = _formatNetDateForPaymentDeliverByDate(_currPayment.sentOn);
    //	document.getElementById("TransferModeHidden").value = "edit";


    //	// Pre-populate the form if there is a scheduled payment set up:
    //	//
    //	//
    //	//
    //	//
    //	// MOCK DATA FOR NOW:
    //	_currPayee.RecurringInformation = null;

    //	//_currPayee.RecurringInformation.Description = "My recurring payment";
    //	//_currPayee.RecurringInformation.RecurrenceType = 5;         // 1 = daily;   2 = weekly    3 = twice monthly    4 = monthly    5 = yearly



    //	if (_currPayee.RecurringInformation !== undefined || _currPayee.RecurringInformation !== null) {
    //		//console.log("got here: payee has a recurring information.");

    //		var TransfersFormBlob = document.getElementById("TransfersForm");

    //		TransfersFormBlob.ScheduledTransferCheckbox.click();    // check the checkbox.. this also fires the event to expose the recurring top section
    //		TransfersFormBlob.ScheduledTransferDescriptionTextbox.value = _currPayee.RecurringInformation.Description;  // set the description textbox
    //		TransfersFormBlob.ScheduledTransferFrequencySelect.value = _currPayee.RecurringInformation.RecurrenceType;  // set the frequency drop down
    //		$("#ScheduledTransferEndDateSection").slideDown();                                                            // show ending occurance section
    //		$("#ScheduledTransferEndingDateTextbox").datepicker({
    //			autoSize: true,
    //			dateFormat: "mm/dd/yy",
    //			maxDate: "+1825d",      // 5 years is enough?
    //			minDate: "-0d",
    //			onSelect: function () { } /* workaround for IE validator bug */
    //		});

    //		// daily
    //		if (_currPayee.RecurringInformation.RecurrenceType === 1) {
    //			$("#ScheduledTransferDailySection").slideDown();


    //			// MOCK DATA:
    //			_currPayee.RecurringInformation.Interval = 2;

    //			// set the form:
    //			if (_currPayee.RecurringInformation.Interval !== undefined || _currPayee.RecurringInformation.Interval !== null) {
    //				TransfersFormBlob.ScheduledTransferDailyXdaysRadio.checked = true;
    //				TransfersFormBlob.ScheduledTransferBeginningTextbox.value = _currPayee.RecurringInformation.Interval;
    //			} else {
    //				TransfersFormBlob.ScheduledTransferDailyWeekdayRadio.checked = true;
    //			}
    //		}

    //		// weekly
    //		if (_currPayee.RecurringInformation.RecurrenceType === 2) {
    //			$("#ScheduledTransferWeeklySection").slideDown();


    //			// MOCK DATA:
    //			_currPayee.RecurringInformation.Interval = 3;
    //			_currPayee.RecurringInformation.DayOfWeekMask = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];


    //			// set the form:
    //			if (_currPayee.RecurringInformation.Interval !== undefined || _currPayee.RecurringInformation.Interval !== null) {
    //				TransfersFormBlob.ScheduledTransferWeeklyTextbox.value = _currPayee.RecurringInformation.Interval;
    //			} else {
    //				TransfersFormBlob.ScheduledTransferWeeklyTextbox.value = 1;
    //			}

    //			// checkboxes for days:
    //			if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Monday") > -1) { TransfersFormBlob.ScheduledTransferWeeklyMondayCheckbox.checked = true; }
    //			if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Tuesday") > -1) { TransfersFormBlob.ScheduledTransferWeeklyTuesdayCheckbox.checked = true; }
    //			if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Wednesday") > -1) { TransfersFormBlob.ScheduledTransferWeeklyWednesdayCheckbox.checked = true; }
    //			if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Thursday") > -1) { TransfersFormBlob.ScheduledTransferWeeklyThursdayCheckbox.checked = true; }
    //			if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Friday") > -1) { TransfersFormBlob.ScheduledTransferWeeklyFridayCheckbox.checked = true; }
    //		}

    //		// twice monthly
    //		if (_currPayee.RecurringInformation.RecurrenceType === 3) {
    //			$("#ScheduledTransferTwiceMonthlySection").slideDown();


    //			// MOCK DATA:
    //			_currPayee.RecurringInformation.Interval = 3;
    //			_currPayee.RecurringInformation.DayOfMonth = 15;
    //			_currPayee.RecurringInformation.SecondDayOfMonth = 31;

    //			if (_currPayee.RecurringInformation.DayOfMonth ==15 && _currPayee.RecurringInformation.SecondDayOfMonth === 31) {
    //				// 15th and Last:
    //				TransfersFormBlob.ScheduledTransferTwiceMonthly15thAndLastDayRadio.checked = true;

    //				if (_currPayee.RecurringInformation.Interval !== undefined || _currPayee.RecurringInformation.Interval !== null) {
    //					TransfersFormBlob.ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox.value = _currPayee.RecurringInformation.Interval;
    //				} else {
    //					TransfersFormBlob.ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox.value = 1;
    //				}
    //			} else {
    //				// chosen days:
    //				TransfersFormBlob.ScheduledTransferTwiceMonthlyChosenDaysRadio.checked = true;
    //				TransfersFormBlob.ScheduledTransferTwiceMonthlyBeginningDayTextbox.value = _currPayee.RecurringInformation.DayOfMonth;
    //				TransfersFormBlob.ScheduledTransferTwiceMonthlyConcludingDayTextbox.value = _currPayee.RecurringInformation.SecondDayOfMonth;

    //				if (_currPayee.RecurringInformation.Interval !== undefined || _currPayee.RecurringInformation.Interval !== null) {
    //					TransfersFormBlob.ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox.value = _currPayee.RecurringInformation.Interval;
    //				} else {
    //					TransfersFormBlob.ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox.value = 1;
    //				}
    //			}
    //		}


    //		// monthly
    //		if (_currPayee.RecurringInformation.RecurrenceType === 4) {
    //			$("#ScheduledTransferMonthlySection").slideDown();


    //			// MOCK DATA:
    //			_currPayee.RecurringInformation.Interval = 3;
    //			_currPayee.RecurringInformation.DayOfMonth = 31;
    //			_currPayee.RecurringInformation.Instance = 2;
    //			_currPayee.RecurringInformation.DayOfWeekMask = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    //			// chosen day
    //			if ((_currPayee.RecurringInformation.Instance === undefined || _currPayee.RecurringInformation.Instance === null) && _currPayee.RecurringInformation.DayOfMonth !== 31) {
    //				TransfersFormBlob.ScheduledTransferMonthlyChosenDaysRadio.checked = true;
    //				TransfersFormBlob.ScheduledTransferMonthlyBeginningDayTextbox.value = _currPayee.RecurringInformation.DayOfMonth;

    //				if (_currPayee.RecurringInformation.Interval !== undefined || _currPayee.RecurringInformation.Interval !== null) {
    //					TransfersFormBlob.ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox.value = _currPayee.RecurringInformation.Interval;
    //				} else {
    //					TransfersFormBlob.ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox.value = 1;
    //				}
    //			}

    //			// last day
    //			if ((_currPayee.RecurringInformation.Instance === undefined || _currPayee.RecurringInformation.Instance === null) && _currPayee.RecurringInformation.DayOfMonth === 31) {
    //				TransfersFormBlob.ScheduledTransferMonthlyLastDayRadio.checked = true;

    //				if (_currPayee.RecurringInformation.Interval !== undefined || _currPayee.RecurringInformation.Interval !== null) {
    //					TransfersFormBlob.ScheduledTransferMonthlyLastDayTextbox.value = _currPayee.RecurringInformation.Interval;
    //				} else {
    //					TransfersFormBlob.ScheduledTransferMonthlyLastDayTextbox.value = 1;
    //				}
    //			}

    //			// Nth day(s)
    //			if (_currPayee.RecurringInformation.Instance !== undefined || _currPayee.RecurringInformation.Instance !== null) {
    //				TransfersFormBlob.ScheduledTransferMonthlyMonthNthRadio.checked = true;
    //				TransfersFormBlob.ScheduledTransferMonthlyMonthlyNthEnumerationSelect.value = _currPayee.RecurringInformation.Instance;

    //				if (_currPayee.RecurringInformation.Interval !== undefined || _currPayee.RecurringInformation.Interval !== null) {
    //					TransfersFormBlob.ScheduledTransferMonthlyMonthlyNthTextbox.value = _currPayee.RecurringInformation.Interval;
    //				} else {
    //					TransfersFormBlob.ScheduledTransferMonthlyMonthlyNthTextbox.value = 1;
    //				}

    //				// checkboxes for days:
    //				if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Monday") > -1) { TransfersFormBlob.ScheduledTransferMonthlyMondayCheckbox.checked = true; }
    //				if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Tuesday") > -1) { TransfersFormBlob.ScheduledTransferMonthlyTuesdayCheckbox.checked = true; }
    //				if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Wednesday") > -1) { TransfersFormBlob.ScheduledTransferMonthlyWednesdayCheckbox.checked = true; }
    //				if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Thursday") > -1) { TransfersFormBlob.ScheduledTransferMonthlyThursdayCheckbox.checked = true; }
    //				if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Friday") > -1) { TransfersFormBlob.ScheduledTransferMonthlyFridayCheckbox.checked = true; }
    //			}
    //		}


    //		// yearly
    //		if (_currPayee.RecurringInformation.RecurrenceType === 5) {
    //			$("#ScheduledTransferYearlySection").slideDown();


    //			// MOCK DATA:
    //			_currPayee.RecurringInformation.Interval = 3;
    //			_currPayee.RecurringInformation.DayOfMonth = 12;
    //			_currPayee.RecurringInformation.MonthOfYear = 7;
    //			_currPayee.RecurringInformation.Instance = 3;
    //			_currPayee.RecurringInformation.DayOfWeekMask = [ "Monday", "Friday"];

    //			// month & day date
    //			if ((_currPayee.RecurringInformation.Instance === undefined || _currPayee.RecurringInformation.Instance === null) &&
    //				  (_currPayee.RecurringInformation.DayOfWeekMask === undefined || _currPayee.RecurringInformation.DayOfWeekMask === null)) {
    //				TransfersFormBlob.ScheduledTransferYearlySelectMonthRadio.checked = true;
    //				TransfersFormBlob.ScheduledTransferYearlyMonthSelect.value = _currPayee.RecurringInformation.MonthOfYear;
    //				TransfersFormBlob.ScheduledTransferYearlyDayTextbox.value = _currPayee.RecurringInformation.DayOfMonth;
    //			}

    //			// instance weekday and month
    //			if ((_currPayee.RecurringInformation.Instance !== undefined || _currPayee.RecurringInformation.Instance !== null) &&
    //				  (_currPayee.RecurringInformation.DayOfWeekMask !== undefined && _currPayee.RecurringInformation.DayOfWeekMask.length === 1)) {
    //				TransfersFormBlob.ScheduledTransferYearlyDayOfMonthRadio.checked = true;
    //				TransfersFormBlob.ScheduledTransferYearlyNumberEnumerationSelect.value = _currPayee.RecurringInformation.Instance;
    //				TransfersFormBlob.ScheduledTransferYearlyWeekdayEnumerationSelect.value = _currPayee.RecurringInformation.DayOfWeekMask[0];
    //				TransfersFormBlob.ScheduledTransferYearlyMonth2Select.value = _currPayee.RecurringInformation.MonthOfYear;
    //			}

    //			// Yearly Nth
    //			if ((_currPayee.RecurringInformation.Instance !== undefined || _currPayee.RecurringInformation.Instance !== null) &&
    //				  (_currPayee.RecurringInformation.DayOfWeekMask !== undefined && _currPayee.RecurringInformation.DayOfWeekMask.length > 1)) {
    //				TransfersFormBlob.ScheduledTransferYearlyYearlyNthRadio.checked = true;
    //				TransfersFormBlob.ScheduledTransferYearlyNthEnumerationSelect.value = _currPayee.RecurringInformation.Instance;
    //				TransfersFormBlob.ScheduledTransferYearlyNthMonthSelect.value = _currPayee.RecurringInformation.MonthOfYear;
    //				TransfersFormBlob.ScheduledTransferYearlyNthTextbox.value = _currPayee.RecurringInformation.Instance;

    //				// checkboxes for days:
    //				if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Monday") > -1) { TransfersFormBlob.ScheduledTransferYearlyNthMondayCheckbox.checked = true; }
    //				if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Tuesday") > -1) { TransfersFormBlob.ScheduledTransferYearlyNthTuesdayCheckbox.checked = true; }
    //				if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Wednesday") > -1) { TransfersFormBlob.ScheduledTransferYearlyNthWednesdayCheckbox.checked = true; }
    //				if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Thursday") > -1) { TransfersFormBlob.ScheduledTransferYearlyNthThursdayCheckbox.checked = true; }
    //				if (_currPayee.RecurringInformation.DayOfWeekMask.indexOf("Friday") > -1) { TransfersFormBlob.ScheduledTransferYearlyNthFridayCheckbox.checked = true; }
    //			}

    //		}


    //		// Ending Occurance
    //		// MOCK DATA:
    //		_currPayee.RecurringInformation.EndTimeUtc = "2018-07-26";
    //		_currPayee.RecurringInformation.MaxOccurrences = 7;

    //		// no end
    //		if ((_currPayee.RecurringInformation.EndTimeUtc === undefined || _currPayee.RecurringInformation.EndTimeUtc === null) &&
    //				(_currPayee.RecurringInformation.MaxOccurrences === undefined || _currPayee.RecurringInformation.MaxOccurrences === null || _currPayee.RecurringInformation.MaxOccurrences === 0)) {
    //			TransfersFormBlob.ScheduledTransferEndingNoEndRadio.checked = true;
    //		}

    //		// number of occurences
    //		if ((_currPayee.RecurringInformation.EndTimeUtc === undefined || _currPayee.RecurringInformation.EndTimeUtc === null) &&  _currPayee.RecurringInformation.MaxOccurrences > 0) {
    //			TransfersFormBlob.ScheduledTransferEndingXoccurencesRadio.checked = true;
    //			TransfersFormBlob.ScheduledTransferEndingOccurencesTextbox.value = _currPayee.RecurringInformation.MaxOccurrences;
    //		}

    //		// end on date
    //		if (_currPayee.RecurringInformation.EndTimeUtc !== undefined && _currPayee.RecurringInformation.EndTimeUtc !== null) {
    //			TransfersFormBlob.ScheduledTransferEndingByDateRadio.checked = true;
    //			TransfersFormBlob.ScheduledTransferEndingDateTextbox.value = TransfersReactModule.formatNetDateForPaymentDeliverByDate(_currPayee.RecurringInformation.EndTimeUtc);
    //		}

    //	} // end payment has schedule
    //}



    // toggle Scheduled Transfer Section:
    const _toggleScheduledTransferSection = (e) => {
        console.log("FROM CLICK: e: ", e);

        var currTarget = e.target;

        if ($(currTarget).is(":checked")) {
            $("#ScheduledTransferSection").slideDown();

            TransfersReactModule.initializeDateTimePickers();

            // IRA contribution year not supported on scheduled transfers
            $("#IraContributionYearDiv").slideUp();
            $("#IraContributionYearSelect").val("none");
        } else {
            $("#ScheduledTransferSection").slideUp();
            $("#ScheduledTransferEndDateSection").slideUp();

            // reset top section:
            $("#ScheduledTransferDescriptionTextbox").val("");
            $("#ScheduledTransferFrequencySelect").val("none");

            // radios:
            $("#ScheduledTransferSection input:radio").prop("checked", false);

            // checkboxes:
            $("#ScheduledTransferSection input:checkbox").prop("checked", false);

            // textboxes:
            $("#ScheduledTransferSection input:text").val("");

            // Select lists:
            $("#ScheduledTransferSection .bill-pay-select").prop("selectedIndex", 0);

            // hide sections:
            TransfersReactModule.hideScheduledTransferSubSections();

            // show IRA contribution year if there is a qualifying to account
            if (_selectedToAccount !== null && _selectedToAccount.allowIRAPreviousYear === true) {
                $("#IraContributionYearDiv").slideDown();
            }

            // re-validate top section only:
            if ($("#TransfersValidationDiv").is(":visible")) {
                TransfersReactModule.validateScheduledTransferForm(true);
            }
        }

        // check for fees
        var hasFee = false;

        // Fee From:
        if (_selectedFromAccount && !HomeBanking.Utilities.String.IsNullOrEmpty(_selectedFromAccount.feeAmountFrom)
            && isFinite(Number(_selectedFromAccount.feeAmountFrom)) && Number(_selectedFromAccount.feeAmountFrom) > 0) {
            $("#FeeFromSpan").text(HomeBanking.Utilities.Currency.FormatCentsToDollars(_selectedFromAccount.feeAmountFrom));
            $("#FeeFromDiv").slideDown();
        } else {
            $("#FeeFromDiv").slideUp();
        }

        // Fee to:
        if (_selectedToAccount && !HomeBanking.Utilities.String.IsNullOrEmpty(_selectedToAccount.feeAmountTo)
            && isFinite(Number(_selectedToAccount.feeAmountTo)) && Number(_selectedToAccount.feeAmountTo) > 0) {
            $("#FeeToSpan").text(HomeBanking.Utilities.Currency.FormatCentsToDollars(_selectedToAccount.feeAmountTo));
            $("#FeeToDiv").slideDown();
            hasFee = true;
        } else {
            $("#FeeToDiv").slideUp();
        }

        // Always show fee if configured that way:
        if (TransfersReactObject.Settings.transferConfiguration.AlwaysShowFeeAccountForScheduledExternal && $("#ScheduledTransferCheckbox").is(":checked")) {
            if (typeof _selectedFromAccount !== "undefined" && _selectedFromAccount !== null && _selectedFromAccount.slType === "LINKED") {
                hasFee = true;
            } else if (typeof _selectedToAccount !== "undefined" && _selectedToAccount !== null && _selectedToAccount.slType === "LINKED") {
                hasFee = true;
            } else {
                $("#FeeToDiv").slideUp();
            }
        } else {
            $("#FeeToDiv").slideUp();
        }

        // Fee drop-down:
        if (hasFee) {
            $("#FeeSelectDiv").slideDown();
        } else {
            $("#FeeSelectDiv").slideUp();
        }
    }


    // handle keyup event on this checkbox. send it to the regular checkbox handler if the key was the enter key. (ADA Compliance)
    const _handleScheduledTransferSectionCheckboxKeyPress = (e) => {
        var currTarget = e.target;

        // toggle the checkbox first before sending it to the regular handler:
        if (e.key === "Enter") {
            if ($(currTarget).is(":checked")) {
                $(currTarget).prop("checked", false)
            } else {
                $(currTarget).prop("checked", true)
            }

            _toggleScheduledTransferSection(e);
        }
    }


    // change Scheduled Transfers Frequency Sub Sections:
    const _changeScheduledTransferFrequencySubSections = (e) => {
        // hide all by default first:
        TransfersReactModule.hideScheduledTransferSubSections();

        switch (e.target.value) {
            case _scheduledFrequencyEnum.ONE_TIME:       // one time occurance
                // none
                break;

            case _scheduledFrequencyEnum.DAILY:       // daily
                if (!$("#ScheduledTransferDailySection").is(":visible")) {
                    $("#ScheduledTransferDailySection").slideDown();
                }
                break;

            case _scheduledFrequencyEnum.WEEKLY:       // weekly
                if (!$("#ScheduledTransferWeeklySection").is(":visible")) {
                    $("#ScheduledTransferWeeklySection").slideDown();
                }
                break;

            case _scheduledFrequencyEnum.TWICE_MONTHLY:       // twice monthly
                if (!$("#ScheduledTransferTwiceMonthlySection").is(":visible")) {
                    $("#ScheduledTransferTwiceMonthlySection").slideDown();
                }
                break;

            case _scheduledFrequencyEnum.MONTHLY:       // monthly
                if (!$("#ScheduledTransferMonthlySection").is(":visible")) {
                    $("#ScheduledTransferMonthlySection").slideDown();
                }

                // for now, monthly is the only frequency that can be disabled:
                if (TransfersReactModule.isTransferOccurrencePatternDisabled(_scheduledFrequencyEnum.MONTHLY)) {
                    $("#MonthlyOccurrenceDisabledNoticeDiv").slideDown();
                    $("#MonthyOccurrenceOptionsDiv").hide();
                } else {
                    $("#MonthlyOccurrenceDisabledNoticeDiv").hide();
                    $("#MonthyOccurrenceOptionsDiv").slideDown();
                }

                break;

            case _scheduledFrequencyEnum.YEARLY:       // yearly
                if (!$("#ScheduledTransferYearlySection").is(":visible")) {
                    $("#ScheduledTransferYearlySection").slideDown();
                }
                break;
            default:
        }

        if (e.target.value !== _scheduledFrequencyEnum.ONE_TIME && !$("#ScheduledTransferEndDateSection").is(":visible")) {
            // set ending date field to date picker:
            TransfersReactModule.initializeDateTimePickers();

            $("#ScheduledTransferEndDateSection").slideDown();
        } else if (e.target.value === _scheduledFrequencyEnum.ONE_TIME) {
            $("#ScheduledTransferEndDateSection").slideUp();
        }

        // re-validate only the NON-SCHEDULED portion of the form on frequency select drop-down change event:
        if ($("#TransfersValidationDiv").is(":visible")) {
            TransfersReactModule.validateScheduledTransferForm(true);
        }
    }


    // hide all scheduled transfers sub sections:
    const _hideScheduledTransferSubSections = (e) => {
        // hide sections
        $("#ScheduledTransferDailySection").slideUp();
        $("#ScheduledTransferWeeklySection").slideUp();
        $("#ScheduledTransferTwiceMonthlySection").slideUp();
        $("#ScheduledTransferMonthlySection").slideUp();
        $("#ScheduledTransferYearlySection").slideUp();

        // reset subsection validation:
        TransfersReactModule.resetRecurringSectionValidation();
    }


    // get user account by id. we search through the _userAccounts by id and return the one we find
    const _getUserAccountById = (id) => {
        var lookup = {};

        // SHARES
        if (_memberAccounts.shares && _memberAccounts.shares.length > 0) {
            for (var i = 0; i < _memberAccounts.shares.length; i++) {
                lookup[_memberAccounts.shares[i].id] = _memberAccounts.shares[i];
            }
        }

        // LOANS
        if (_memberAccounts.loans && _memberAccounts.loans.length > 0) {
            for (var i = 0; i < _memberAccounts.loans.length; i++) {
                lookup[_memberAccounts.loans[i].id] = _memberAccounts.loans[i];
            }
        }

        // CARDS
        if (_memberAccounts.cards && _memberAccounts.cards.length > 0) {
            for (var i = 0; i < _memberAccounts.cards.length; i++) {
                lookup[_memberAccounts.cards[i].id] = _memberAccounts.cards[i];
            }
        }

        // LINKED ACCOUNTS
        if (_memberAccounts.linkedAccounts && _memberAccounts.linkedAccounts.length > 0) {
            for (var i = 0; i < _memberAccounts.linkedAccounts.length; i++) {
                lookup[_memberAccounts.linkedAccounts[i].id] = _memberAccounts.linkedAccounts[i];
            }
        }

        // HOUSEHOLDING
        if (_memberAccounts.householdingAccounts && _memberAccounts.householdingAccounts.length > 0) {
            for (var j = 0; j < _memberAccounts.householdingAccounts.length; j++) {
                // SHARES
                if (_memberAccounts.householdingAccounts[j].shares.length > 0) {
                    (function x(j) {
                        for (var i = 0; i < _memberAccounts.householdingAccounts[j].shares.length; i++) {
                            lookup[_memberAccounts.householdingAccounts[j].shares[i].id] = _memberAccounts.householdingAccounts[j].shares[i];
                        }
                    }(j))
                }

                // LOANS 
                if (_memberAccounts.householdingAccounts[j].loans.length > 0) {
                    (function x(j) {
                        for (var i = 0; i < _memberAccounts.householdingAccounts[j].loans.length; i++) {
                            lookup[_memberAccounts.householdingAccounts[j].loans[i].id] = _memberAccounts.householdingAccounts[j].loans[i];
                        }
                    }(j))
                }

                // CARDS
                if (_memberAccounts.householdingAccounts[j].cards.length > 0) {
                    (function x(j) {
                        for (var i = 0; i < _memberAccounts.householdingAccounts[j].cards.length; i++) {
                            lookup[_memberAccounts.householdingAccounts[j].cards[i].id] = _memberAccounts.householdingAccounts[j].cards[i];
                        }
                    }(j))
                }
            }
        }

        // CROSS ACCOUNTS
        if (_memberAccounts.crossAccounts && _memberAccounts.crossAccounts.length > 0) {
            for (var i = 0; i < _memberAccounts.crossAccounts.length; i++) {
                lookup[_memberAccounts.crossAccounts[i].id] = _memberAccounts.crossAccounts[i];
            }
        }

        return lookup[id];
    }


    // reset scheduled transfers subsection validation:
    const _resetRecurringSectionValidation = () => {
        document.getElementById("ScheduledTransferDescriptionTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferFrequencySelect").style.outline = "none";
        document.getElementById("ScheduledTransferDailyXdaysRadio").parentNode.parentNode.style.outline = "none";
        document.getElementById("ScheduledTransferBeginningTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferWeeklyTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferWeeklyMondayCheckbox").parentNode.style.outline = "none";
        document.getElementById("ScheduledTransferTwiceMonthlyChosenDaysRadio").parentNode.parentNode.style.outline = "none";
        document.getElementById("ScheduledTransferTwiceMonthlyBeginningDayTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferTwiceMonthlyConcludingDayTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferTwiceMonthlyMonthlyIntervalTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferTwiceMonthlyFirstFifteenthIntervalTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferMonthlyMonthNthRadio").parentNode.parentNode.style.outline = "none";
        document.getElementById("ScheduledTransferMonthlyBeginningDayTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferMonthlyMonthlyNthTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferMonthlyLastDayTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferMonthlyMondayCheckbox").parentNode.style.outline = "none";
        document.getElementById("ScheduledTransferMonthlyChosenDayMonthlyIntervalTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferYearlySelectMonthRadio").parentNode.parentNode.style.outline = "none";
        document.getElementById("ScheduledTransferYearlyDayTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferYearlyNthMondayCheckbox").parentNode.style.outline = "none";
        document.getElementById("ScheduledTransferYearlyNthTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferEndingInYearsRadio").parentNode.parentNode.style.outline = "none";
        document.getElementById("ScheduledTransferEndingYearsTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferEndingOccurencesTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferEndingDateTextbox").style.outline = "none";
        document.getElementById("ScheduledTransferBeginningDateTextbox").style.outline = "none";

        // reset monthly and yearly drop-downs:
        document.getElementById("ScheduledTransferMonthlyMonthlyNthEnumerationSelect").value = "1";
        document.getElementById("ScheduledTransferYearlyMonthSelect").value = "1";
        document.getElementById("ScheduledTransferYearlyNumberEnumerationSelect").value = "1";
        document.getElementById("ScheduledTransferYearlyWeekdayEnumerationSelect").value = "Monday";
        document.getElementById("ScheduledTransferYearlyMonth2Select").value = "1";
        document.getElementById("ScheduledTransferYearlyNthEnumerationSelect").value = "1";
        document.getElementById("ScheduledTransferYearlyNthMonthSelect").value = "1";

    }


    // show the Transfer Description popover:
    const _showTransferDescriptionPopover = () => {
        $(".tran-descr-explanation-popover").popover('show');
    }


    // show the Transfer Description popover:
    const _showRegdDescriptionPopover = () => {
        $(".regd-descr-explanation-popover").popover('show');
    }


    // compare to and from accounts - get them and do several checks:
    const _examineToAndFromAccounts = (e) => {
        var hasFee;

        // Get currently selected FROM account   
        // React sends a SyntheticEvent. To use the underlying event, you must use the nativeEvent property of the event object
        if (e.nativeEvent.target.id === "TransfersFromSelect") {
            // de-activate any validation stuff that may have been applied to the dropdown:
            if (document.getElementById("TransfersFromSelect").value !== "none") {
                document.getElementById("TransfersFromSelect").style.outline = "none";
            }

            _selectedFromAccount = TransfersReactModule.getUserAccountById($("#TransfersFromSelect").val());

            console.log("_selectedFromAccount", _selectedFromAccount);

            // If account is null, hide all the "from" details sections:
            if (_selectedFromAccount === null) {
                $("#RegdDetailsDiv").hide();
                $("#TransferFromLimitsDiv").hide();
                $("#Hours24TransferFromLimitsDiv").hide();
                $("#FeeFromDiv").hide();
                $("#FreeRemainingFromDiv").hide();
                return;
            }

            // See if selected account is an internal credit card type offering Cash Advance:
            _selectedFromAccountIsInternalCreditCard = TransfersReactModule.doesLoanQualifyForLoanAdvanceWarning(_selectedFromAccount, TransfersReactObject.Settings.cashAdvanceConfigSettings.cashAdvanceWarningLoanCategories);

            // Enable all "to account" options (some may get disabled below, but default is all enabled)
            $("#TransfersToSelect").find("option").prop("disabled", false);

            // configure the "TO" account drop-down by disabling non-valid transfer account types (this code was brought over from the old transfers.js):
            if (_selectedFromAccount.slType === "LINKED") {
                $("#TransfersToSelect").find("option").each(function () {
                    var toAccount = _getUserAccountById($(this).attr("value"));

                    if (!$.isPlainObject(toAccount)) {
                        return;
                    }

                    if (toAccount.slType === "CREDIT" || toAccount.slType === "LINKED" || toAccount.isCrossAccount || toAccount.achTransferTo === false) {
                        if ($(this).is(":selected")) {
                            $("#TransfersToSelect").val("none");
                            $("#TransfersToSelect").change();
                        }
                        $(this).prop("disabled", true);
                    }
                });
            } else if ((_selectedFromAccount.slType === "L" || _selectedFromAccount.slType === "CREDIT") && TransfersReactObject.Settings.allowLoanToLoanTransfers === "false") {
                $("#TransfersToSelect").find("option").each(function () {
                    var toAccount = _getUserAccountById($(this).attr("value"));

                    if (!$.isPlainObject(toAccount)) {
                        return;
                    }

                    if (toAccount.slType === "CREDIT" || toAccount.slType === "L") {
                        if ($(this).is(":selected")) {
                            $("#TransfersToSelect").val("none");
                            $("#TransfersToSelect").change();
                        }
                        $(this).prop("disabled", true);
                    }
                });
            }

            // Handle fixed ACH start time
            if (TransfersReactObject.Settings.transferConfiguration.AllowScheduledTransfers === "true" &&
                !HomeBanking.Utilities.String.IsNullOrEmpty(TransfersReactObject.Settings.transferConfiguration.ScheduledTransferTimeOptions.FixedACHStartTime)) {
                if (TransfersReactModule.selectedAccountsInvolvesLinkedAccount()) {
                    // If either from or to account is a linked account, use the fixed start time
                    _initializeScheduledTransferDatePickers(TransfersReactObject.Settings.transferConfiguration.ScheduledTransferTimeOptions.FixedACHStartTime);
                } else {
                    _initializeScheduledTransferDatePickers();
                }
            }

            // get the valid transfer accounts for the currently selected account:
            TransfersReactModule.getValidTransferAccountsForSelectedAccount("from");
        }

        // Get currently selected TO account
        if (e.nativeEvent.target.id === "TransfersToSelect") {
            // de-activate any validation stuff that may have been applied to the dropdown:
            if (document.getElementById("TransfersToSelect").value !== "none") {
                document.getElementById("TransfersToSelect").style.outline = "none";
            }
            _selectedToAccount = TransfersReactModule.getUserAccountById($("#TransfersToSelect").val());

            console.log("_selectedToAccount", _selectedToAccount);

            // If account is null, hide all the "to" details sections:
            if (_selectedToAccount === null) {
                $("#TransferToLimitsDiv").hide();
                $("#Hours24TransferToLimitsDiv").hide();
                $("#FeeToDiv").hide();
                $("#FreeRemainingToDiv").hide();

                $("#AdditionalToPrincipalDiv").hide();
                document.getElementById("AdditionalToPrincipalCheckbox").checked = false;

                $("#PrincipalOnlyDiv").hide();
                document.getElementById("PrincipalOnlyCheckbox").checked = false;

                $("#IraContributionYearDiv").hide();
                document.getElementById("IraContributionYearSelect").value = "none";
                return;
            }

            // Enable all "to account" options (some may get disabled below, but default is all enabled)
            $("#TransfersFromSelect").find("option").prop("disabled", false);

            // configure the "TO" account drop-down by disabling non-valid transfer account types:
            if (_selectedToAccount.slType === "LINKED") {
                $("#TransfersFromSelect").find("option").each(function () {
                    var fromAccount = _getUserAccountById($(this).attr("value"));

                    if (!$.isPlainObject(fromAccount)) {
                        return;
                    }

                    if (fromAccount.slType === "LINKED" || fromAccount.isCrossAccount || fromAccount.achTransferTo === false) {
                        if ($(this).is(":selected")) {
                            $("#TransfersToSelect").val("none");
                            $("#TransfersToSelect").change();
                        }
                        $(this).prop("disabled", true);
                    }
                });
            } else if ((_selectedToAccount.slType === "L" || _selectedToAccount.slType === "CREDIT") && TransfersReactObject.Settings.allowLoanToLoanTransfers === "false") {
                $("#TransfersFromSelect").find("option").each(function () {
                    var fromAccount = _getUserAccountById($(this).attr("value"));

                    if (!$.isPlainObject(fromAccount)) {
                        return;
                    }

                    if (fromAccount.slType === "CREDIT" || fromAccount.slType === "L") {
                        if ($(this).is(":selected")) {
                            $("#TransfersToSelect").val("none");
                            $("#TransfersToSelect").change();
                        }
                        $(this).prop("disabled", true);
                    }
                });
            }

            // Handle fixed ACH start time
            if (TransfersReactObject.Settings.transferConfiguration.AllowScheduledTransfers === "true" &&
                !HomeBanking.Utilities.String.IsNullOrEmpty(TransfersReactObject.Settings.transferConfiguration.ScheduledTransferTimeOptions.FixedACHStartTime)) {
                if (TransfersReactModule.selectedAccountsInvolvesLinkedAccount()) {
                    // If either from or to account is a linked account, use the fixed start time
                    _initializeScheduledTransferDatePickers(TransfersReactObject.Settings.transferConfiguration.ScheduledTransferTimeOptions.FixedACHStartTime);
                } else {
                    _initializeScheduledTransferDatePickers();
                }
            }
            // get the valid transfer accounts for the currently selected account:
            TransfersReactModule.getValidTransferAccountsForSelectedAccount("to");
        }

        // LINKED accounts don't allow certain transfer frequencies. Check them and disable them in the frequencies drop-down:
        TransfersReactModule.setupScheduleTransferFrequencies();

        // Compare to see if the "From" account and the "To" account are the same:
        if ($("#TransfersFromSelect").val() !== "none" && $("#TransfersToSelect").val() !== "none") {
            if ($("#TransfersFromSelect").val() === $("#TransfersToSelect").val()) {
                $("#TransferToLimitsDiv").slideUp();
                $("#Hours24TransferToLimitsDiv").slideUp();
                $("#ToAndFromAccountsAreSameWarningDiv").slideDown();
                document.getElementById("TransfersToSelect").style.outline = "1px solid red";
                document.getElementById("AddPaymentSubmitButton").disabled = true;
                return;
            } else {
                $("#ToAndFromAccountsAreSameWarningDiv").slideUp();
                document.getElementById("TransfersToSelect").style.outline = "none";
                document.getElementById("AddPaymentSubmitButton").disabled = false;
            }
        }

        // REG D:
        if (_selectedFromAccount && !HomeBanking.Utilities.String.IsNullOrEmpty(_selectedFromAccount.regDWithdrawals)) {
            $("#RegdWithdrawlsSpan").text(_selectedFromAccount.regDWithdrawals);
            $("#RegdDetailsDiv").slideDown();
        } else {
            $("#RegdDetailsDiv").slideUp();
        }

        // Transfer From Limits:
        if (_selectedFromAccount && !HomeBanking.Utilities.String.IsNullOrEmpty(_selectedFromAccount.limitFrom)) {
            $("#TransferFromLimitSpan").text(HomeBanking.Utilities.Currency.FormatCentsToDollars(_selectedFromAccount.limitFrom));
            $("#TransferFromLimitsDiv").slideDown();
        } else {
            $("#TransferFromLimitsDiv").slideUp();
        }

        // 24-Hour Transfer From Limits:
        if (_selectedFromAccount && !HomeBanking.Utilities.String.IsNullOrEmpty(_selectedFromAccount.limit24From)) {
            $("#Hours24TransferFromLimitSpan").text(HomeBanking.Utilities.Currency.FormatCentsToDollars(_selectedFromAccount.limit24From));
            $("#Hours24TransferFromLimitsDiv").slideDown();
        } else {
            $("#Hours24TransferFromLimitsDiv").slideUp();
        }

        // Transfer To Limits:
        if (_selectedToAccount && !HomeBanking.Utilities.String.IsNullOrEmpty(_selectedToAccount.limitTo)) {
            $("#TransferToLimitSpan").text(HomeBanking.Utilities.Currency.FormatCentsToDollars(_selectedToAccount.limitTo));
            $("#TransferToLimitsDiv").slideDown();
        } else {
            $("#TransferToLimitsDiv").slideUp();
        }

        // 24-Hour Transfer To Limits:
        if (_selectedToAccount && !HomeBanking.Utilities.String.IsNullOrEmpty(_selectedToAccount.limit24To)) {
            $("#Hours24TransferToLimitSpan").text(HomeBanking.Utilities.Currency.FormatCentsToDollars(_selectedToAccount.limit24To));
            $("#Hours24TransferToLimitsDiv").slideDown();
        } else {
            $("#Hours24TransferToLimitsDiv").slideUp();
        }

        // Fee From:
        if (_selectedFromAccount && !HomeBanking.Utilities.String.IsNullOrEmpty(_selectedFromAccount.feeAmountFrom)
            && isFinite(Number(_selectedFromAccount.feeAmountFrom)) && Number(_selectedFromAccount.feeAmountFrom) > 0) {
            $("#FeeFromSpan").text(HomeBanking.Utilities.Currency.FormatCentsToDollars(_selectedFromAccount.feeAmountFrom));
            $("#FeeFromDiv").slideDown();
            hasFee = true;
        } else {
            $("#FeeFromDiv").slideUp();
        }

        // Fee to:
        if (_selectedToAccount && !HomeBanking.Utilities.String.IsNullOrEmpty(_selectedToAccount.feeAmountTo)
            && isFinite(Number(_selectedToAccount.feeAmountTo)) && Number(_selectedToAccount.feeAmountTo) > 0) {
            $("#FeeToSpan").text(HomeBanking.Utilities.Currency.FormatCentsToDollars(_selectedToAccount.feeAmountTo));
            $("#FeeToDiv").slideDown();
            hasFee = true;
        } else {
            $("#FeeToDiv").slideUp();
        }

        // Always show fee if configured that way:
        if (TransfersReactObject.Settings.transferConfiguration.AlwaysShowFeeAccountForScheduledExternal === false && $("#ScheduledTransferCheckbox").is(":checked")) {
            if (_selectedFromAccount !== null && _selectedFromAccount.slType === "LINKED") {
                hasFee = true;
            } else if (_selectedToAccount !== null && _selectedToAccount.slType === "LINKED") {
                hasFee = true;
            } else {
                $("#FeeToDiv").slideUp();
            }
        } else {
            $("#FeeToDiv").slideUp();
        }

        // Fee drop-down:
        if (hasFee) {
            $("#FeeSelectDiv").slideDown();
        } else {
            $("#FeeSelectDiv").slideUp();
        }

        // Free Remaining From:
        if (_selectedFromAccount && !HomeBanking.Utilities.String.IsNullOrEmpty(_selectedFromAccount.remainingFreeTransfersFrom) && _selectedFromAccount.remainingFreeTransfersFrom !== "0") {
            $("#FreeRemainingFromSpan").text(_selectedFromAccount.remainingFreeTransfersFrom);
            $("#FreeRemainingFromDiv").slideDown();
        } else {
            $("#FreeRemainingFromDiv").slideUp();
        }

        // Free Remaining To:
        if (_selectedToAccount && !HomeBanking.Utilities.String.IsNullOrEmpty(_selectedToAccount.remainingFreeTransfersTo) && _selectedToAccount.remainingFreeTransfersTo !== "0") {
            $("#FreeRemainingToSpan").text(_selectedToAccount.remainingFreeTransfersTo);
            $("#FreeRemainingToDiv").slideDown();
        } else {
            $("#FreeRemainingToDiv").slideUp();
        }

        // Additional Principal:
        if (!TransfersReactObject.Settings.groupAdditionalTransferOptions) {
            if (_selectedToAccount && _selectedToAccount.allowExtraToPrincipal === true) {       
                $("#AdditionalToPrincipalDiv").slideDown();
            } else {
                $("#AdditionalToPrincipalDiv").slideUp();
                $("#AdditionalToPrincipalCheckbox").prop("checked", false);
            }
        } else {
            if (_selectedToAccount && _selectedToAccount.allowExtraToPrincipal === true) {
                $("#AdditionalToPrincipalDiv").slideDown();
                _additionalToPrincipalShouldBeOpen = true;

                if (!_additionalTransferOptionsAreVisible) {
                    $("#CollapseExpandImg").click()
                }
            } else {          
                $("#AdditionalToPrincipalDiv").slideUp();
                $("#AdditionalToPrincipalCheckbox").prop("checked", false);
                _additionalToPrincipalShouldBeOpen = false;
            }
        }


        // Principal Only:
        if (!TransfersReactObject.Settings.groupAdditionalTransferOptions) {
            if (_selectedToAccount && _selectedToAccount.allowPrincipalOnlyPayment === true) {              
                $("#PrincipalOnlyDiv").slideDown();
            } else {
                $("#PrincipalOnlyDiv").slideUp();
                $("#PrincipalOnlyCheckbox").prop("checked", false);
            }
        } else {
            if (_selectedToAccount && _selectedToAccount.allowPrincipalOnlyPayment === true) {
                $("#PrincipalOnlyDiv").slideDown();
                _principalOnlyShouldBeOpen = true;

                if (!_additionalTransferOptionsAreVisible) {
                    $("#CollapseExpandImg").click()
                }
            } else {             
                $("#PrincipalOnlyDiv").slideUp();
                $("#PrincipalOnlyCheckbox").prop("checked", false);
                _principalOnlyShouldBeOpen = false;
            }  
        }


        // IRA Contribution year:
        if (!TransfersReactObject.Settings.groupAdditionalTransferOptions) {
            if (_selectedToAccount && _selectedToAccount.allowIRAPreviousYear === true && !$("#ScheduledTransferCheckbox").is(":checked")) {      // only show if the scheduled transfer box isn't checked  
                $("#IraContributionYearDiv").slideDown();
            } else {
                $("#IraContributionYearDiv").slideUp();
                $("#IraContributionYearSelect").val("none");
            }
        } else {
            if (_selectedToAccount && _selectedToAccount.allowIRAPreviousYear === true && !$("#ScheduledTransferCheckbox").is(":checked")) {             
                $("#IraContributionYearDiv").slideDown();
                _iraContributionYearShouldBeOpen = true;

                if (!_additionalTransferOptionsAreVisible) {
                    $("#CollapseExpandImg").click()
                }
            } else {
                $("#IraContributionYearDiv").slideUp();
                $("#IraContributionYearSelect").val("none");
                _iraContributionYearShouldBeOpen = false;
            }              
        }



        // Determine if toAccount is a morgage and display a message if it is:
        if (_selectedToAccount && _isMortgage(_selectedToAccount) === true) {
            $("#MortgageWarningDiv").slideDown();
        } else {
            $("#MortgageWarningDiv").slideUp();
        }

        // if a "LINKED" account, show or hide the "is scheduled transfer" checkbox depending on if the Linked account allows for it:
        // Not all account types have these properties, so specifically check if disabled instead of not enabled.
        var scheduledAllowed = true;

        if (!TransfersReactObject.Settings.transferConfiguration.AllowScheduledTransfers) {
            scheduledAllowed = false;
        } else if (typeof _selectedFromAccount != "undefined" && _selectedFromAccount !== null && _selectedFromAccount.slType === "LINKED" && _selectedFromAccount.scheduleTransferFrom === false) {
            scheduledAllowed = false;
        } else if (typeof _selectedToAccount != "undefined" && _selectedToAccount !== null && _selectedToAccount.slType === "LINKED" && _selectedToAccount.scheduleTransferFrom === false) {
            scheduledAllowed = false;
        }

        if (scheduledAllowed && (!TransfersReactObject.Settings.groupAdditionalTransferOptions || _additionalTransferOptionsAreVisible)) {
            $("#ScheduledTransfersSectionDiv").slideDown("");
        } else {
            $("#ScheduledTransfersSectionDiv").slideUp("");
            $("#ScheduledTransferCheckbox").prop("checked", false);
            $("#ScheduledTransferCheckbox").change();
        }
    }

    const _isMortgage = (loan) => {
        console.log("Entering IsMortgageMethod");
        //return true if the loans cetegory is in the list of mortgage loan categories.
        if (typeof TransfersReactObject.Settings.mortgageLoanCategories === "undefined" || TransfersReactObject.Settings.mortgageLoanCategories === "null" || TransfersReactObject.Settings.mortgageLoanCategories.count < 1) {
            return false;
        }
        return (loan.slType === "L" &&
            $.inArray(loan.category, TransfersReactObject.Settings.mortgageLoanCategories) > -1);
    }


    // get the fee account from the drop-down select change:
    const _setSelectedFeeAccount = () => {
        // Get currently selected FEE account by it's select value (an id)  (NOTE: can't use e.target because it is built in a mapping function and returns a synthetic event with null properties
        _selectedFeeAccount = TransfersReactModule.getUserAccountById($("#FeeAccountSelect").val());
    }


    // get valid transfer accounts for the currently selected account from the drop down change event (which = "from" or "to"):
    const _getValidTransferAccountsForSelectedAccount = (which) => {
        var apiUrl = HomeBanking.BASE_URL + "api/accounts/get-transfer-accounts";
        var currentAccount = {};

        if (which === "from") {
            currentAccount.HouseholdingAccountId = _selectedFromAccount.householdingAccountId === null || _selectedFromAccount.householdingAccountId === "" ? 0 : _selectedFromAccount.householdingAccountId;
            currentAccount.AccountNumber = null;
            currentAccount.AccountType = _selectedFromAccount.slType;
            currentAccount.AccountSuffix = _selectedFromAccount.suffix;
            currentAccount.IsFromAccount = true;
        } else if (which === "to") {
            currentAccount.HouseholdingAccountId = _selectedToAccount.householdingAccountId === null || _selectedToAccount.householdingAccountId === "" ? 0 : _selectedToAccount.householdingAccountId;
            currentAccount.AccountNumber = null;
            currentAccount.AccountType = _selectedToAccount.slType;
            currentAccount.AccountSuffix = _selectedToAccount.suffix;
            currentAccount.IsFromAccount = false;
        }

        $.ajax({
            url: apiUrl,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                HouseholdingAccountId: currentAccount.HouseholdingAccountId,
                AccountNumber: currentAccount.AccountNumber,
                AccountType: currentAccount.AccountType,
                AccountSuffix: currentAccount.AccountSuffix,
                IsFromAccount: currentAccount.IsFromAccount
            }),
            success: function (data) {
                _validTransferAccounts = data.transferAccounts;
                //console.log("_validTransferAccounts: ", _validTransferAccounts);

                TransfersReactModule.filterSelectLists(which)
            },
            error: function (xhr, err) {
                var terseError = $.parseJSON(xhr.responseText);
                console.log("terseError: ", terseError);
                console.log("Request Failed: " + err);
            }
        });
    }


    // filter select lists on AJAX return from getting valid opposing account types
    const _filterSelectLists = (which) => {
        //console.log("Got here: fileterSelectLists. which = ", which);

        if (which === "from") {
            $("#TransfersToSelect").find("option").each(function () {
                var optionItemAccount = _getUserAccountById($(this).attr("value"));
                var match = false;

                if (!$.isPlainObject(optionItemAccount)) {
                    return;
                }

                // check each account in the drop down to ensure that it exists in the ValidTransferAccounts object that was returned from the AJAX call:
                match = TransfersReactModule.checkAccountExistsInValidTransferAccounts(optionItemAccount);

                if (match === false) {
                    if ($(this).is(":selected")) {
                        $("#TransfersToSelect").val("none");
                        $("#TransfersToSelect").change();
                    }

                    $(this).prop("disabled", true);
                }
            });
        } else if (which === "to") {
            $("#TransfersFromSelect").find("option").each(function () {
                var optionItemAccount = _getUserAccountById($(this).attr("value"));
                var match = false;

                if (!$.isPlainObject(optionItemAccount)) {
                    return;
                }

                // check each account in the drop down to ensure that it exists in the ValidTransferAccounts object that was returned from the AJAX call:
                match = TransfersReactModule.checkAccountExistsInValidTransferAccounts(optionItemAccount);

                if (match === false) {
                    if ($(this).is(":selected")) {
                        $("#TransfersToSelect").val("none");
                        $("#TransfersToSelect").change();
                    }

                    $(this).prop("disabled", true);
                }
            });
        }
    }

    // filter select lists on AJAX return from getting valid opposing account types
    const _checkAccountExistsInValidTransferAccounts = (optionItemAccount) => {
        //console.log("Got here: checkAccountExistsInValidTransferAccounts");

        var isMatch = false;

        $(_validTransferAccounts).each(function () {

            //console.log("_validTransferAccounts", _validTransferAccounts);

            // SHARES
            if ($(this)[0].shares && $(this)[0].shares.length > 0) {
                for (var i = 0; i < $(this)[0].shares.length; i++) {
                    if ($(this)[0].shares[i].suffix === optionItemAccount.suffix && $(this)[0].shares[i].description === optionItemAccount.description && $(this)[0].shares[i].balance === optionItemAccount.balance) {
                        isMatch = true;
                    }
                }
            }

            // LOANS
            if ($(this)[0].loans && $(this)[0].loans.length > 0) {
                for (var i = 0; i < $(this)[0].loans.length; i++) {
                    if ($(this)[0].loans[i].suffix === optionItemAccount.suffix && $(this)[0].loans[i].description === optionItemAccount.description && $(this)[0].loans[i].balance === optionItemAccount.balance) {
                        isMatch = true;
                    }
                }
            }

            // LINKED ACCOUNTS
            if ($(this)[0].linkedAccounts && $(this)[0].linkedAccounts.length > 0) {
                for (var i = 0; i < $(this)[0].linkedAccounts.length; i++) {
                    if ($(this)[0].linkedAccounts[i].achID === optionItemAccount.suffix && $(this)[0].linkedAccounts[i].description === optionItemAccount.description && $(this)[0].linkedAccounts[i].balance === optionItemAccount.balance) {
                        isMatch = true;
                    }
                }
            }

            // CARDS
            if ($(this)[0].cards && $(this)[0].cards.length > 0) {
                for (var i = 0; i < $(this)[0].cards.length; i++) {
                    if ($(this)[0].cards[i].cardNumber === optionItemAccount.cardNumber && $(this)[0].cards[i].cardBal === optionItemAccount.cardBal) {
                        isMatch = true;
                    }
                }
            }

            // HOUSEHOLDING
            if ($(this)[0].householdingAccounts && $(this)[0].householdingAccounts.length > 0) {
                var localThis = $(this)[0];     // otherwise 'this' is the window object in the inner loop trap functions below:

                for (var j = 0; j < $(this)[0].householdingAccounts.length; j++) {
                    // SHARES
                    if ($(this)[0].householdingAccounts[j].shares.length > 0) {
                        (function x(j) {
                            for (var i = 0; i < localThis.householdingAccounts[j].shares.length; i++) {
                                if (localThis.householdingAccounts[j].shares[i].suffix === optionItemAccount.suffix && localThis.householdingAccounts[j].shares[i].description === optionItemAccount.description && localThis.householdingAccounts[j].shares[i].balance === optionItemAccount.balance) {
                                    isMatch = true;
                                }
                            }
                        }(j))
                    }

                    // LOANS
                    if ($(this)[0].householdingAccounts[j].loans.length > 0) {
                        (function x(j) {
                            for (var i = 0; i < localThis.householdingAccounts[j].loans.length; i++) {
                                if (localThis.householdingAccounts[j].loans[i].suffix === optionItemAccount.suffix && localThis.householdingAccounts[j].loans[i].description === optionItemAccount.description && localThis.householdingAccounts[j].loans[i].balance === optionItemAccount.balance) {
                                    isMatch = true;
                                }
                            }
                        }(j))
                    }

                    // CARDS
                    if ($(this)[0].householdingAccounts[j].cards.length > 0) {
                        (function x(j) {
                            for (var i = 0; i < $(this)[0].householdingAccounts[j].cards.length; i++) {
                                if (localThis.householdingAccounts[j].cards[i].cardNumber === optionItemAccount.cardNumber && localThis.householdingAccounts[j].cards[i].cardBal === optionItemAccount.cardBal) {
                                    isMatch = true;
                                }
                            }
                        }(j))
                    }
                }
            }

            // CROSS ACCOUNTS
            if ($(this)[0].crossAccounts && $(this)[0].crossAccounts.length > 0) {
                for (var i = 0; i < $(this)[0].crossAccounts.length; i++) {
                    if ($(this)[0].crossAccounts[i].suffix === optionItemAccount.suffix && $(this)[0].crossAccounts[i].description === optionItemAccount.description && $(this)[0].crossAccounts[i].balance === optionItemAccount.balance) {
                        isMatch = true;
                    }
                }
            }
        });

        return isMatch;
    }


    // validate amount field while typing: restrict non-valid key entries
    const _validateAmountKeyEntries = (e) => {
        var chr = String.fromCharCode(e.which);

        if (("1234567890".indexOf(chr) < 0) && (e.keyCode !== 190 && e.keyCode !== 110 && e.keyCode !== 96 && e.keyCode !== 97
            && e.keyCode !== 98 && e.keyCode !== 99 && e.keyCode !== 100 && e.keyCode !== 101 && e.keyCode !== 102 && e.keyCode !== 103
            && e.keyCode !== 104 && e.keyCode !== 105)) {    // 190 = period     110 = decimal point  96-105 = numeric keypad numbers 0 thru 9
            e.target.value = e.target.value.substring(0, e.target.value.length - 1);
        }
    }


    // format amount field on blur to a decimal number amount:
    const _formatTransferAmountField = (e) => {
        var cents = HomeBanking.Utilities.Currency.ParseDollarsToCents(e.target.value);

        if (!isFinite(cents)) {
            return;
        }

        e.target.value = HomeBanking.Utilities.Currency.FormatCentsToDollars(cents).replace(/^\$/, "");
    }


    // handle principal only checkbox change event
    const _handlePrincipalOnlyCheckboxChange = () => {
        if ($("#PrincipalOnlyCheckbox").is(":checked")) {
            $("#AdditionalToPrincipalCheckbox").prop('checked', false);
        }
    }


    // handle additional principal checkbox change event
    const _handleAdditionalPrincipalCheckboxChange = () => {
        if ($("#AdditionalToPrincipalCheckbox").is(":checked")) {
            $("#PrincipalOnlyCheckbox").prop('checked', false);
        }
    }


    // Calculate IRA Year Contribution years for select drop-down list
    const _calculateIraYearContributionsSelect = () => {
        var currYear = new Date().getFullYear();
        return (
            <select id="IraContributionYearSelect" name="IraContributionYearSelect" className="form-control" aria-label="Select year option" aria-required="true">
                <option value="none">-- Select --</option>
                <option value={currYear - 1}>{currYear - 1}</option>
                <option value={currYear}>{currYear}</option>
            </select>
        );
    }


    // Format a date into a human readable string and return the string
    const _formatDate = (sDate) => {
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


    // initialize date pickers - this happens on 'schedule for a later date?' checkbox change event and change scheduled transfer subsections change from the frequency Select drop-down
    const _initializeDateTimePickers = (fixedCustomTimeValue) => {
        // Remove old date/time pickers (if they exist)
        $("#ScheduledTransferBeginningDateTextbox").datetimepicker("destroy");
        $("#ScheduledTransferEndingDateTextbox").datepicker("destroy");

        var startDateTimePickerOptions = {
            controlType: (HomeBanking.Utilities.Miscellaneous.IsTouchDevice() ? "select" : "slider"),
            dateFormat: "M d, yy",
            maxDate: "+10y",
            minDate: "+0d",
            showMinute: false,
            timeFormat: "h:mm tt",
        };

        if (TransfersReactObject.Settings.transferConfiguration.ScheduledTransferTimeOptions && TransfersReactObject.Settings.transferConfiguration.ScheduledTransferTimeOptions.AllowCustomTime === true) {
            $("#CustomStartTimeInstructionsDiv").slideDown();
            $("#FixedStartTimeInstructionsDiv").hide();

            var initialDateTime;

            if (!HomeBanking.Utilities.String.IsNullOrEmpty(fixedCustomTimeValue) &&
                (initialDateTime = $.datepicker.parseTime("h:mm tt", fixedCustomTimeValue)) !== false) {
                startDateTimePickerOptions.showHour = false; // Don't let user choose hour

                // Set min/max to fixed time
                startDateTimePickerOptions.hourMin = initialDateTime.hour;
                startDateTimePickerOptions.minuteMin = initialDateTime.minute;
                startDateTimePickerOptions.hourMax = initialDateTime.hour;
                startDateTimePickerOptions.minuteMax = initialDateTime.minute;

                // If time already set, but it's not for the correct fixed hour, remove time (in case it was set when user did not yet select an external account)
                try {
                    var existingDateTime = $.datepicker.parseDateTime("M d, yy", "h:mm tt", $("#ScheduledTransferBeginningDateTextbox").val(), null, { timeFormat: "h:mm tt" }); // Workaround https://github.com/trentrichardson/jQuery-Timepicker-Addon/issues/736
                    if (existingDateTime instanceof Date && existingDateTime.getHours() !== initialDateTime.hour) {
                        $("#ScheduledTransferBeginningDateTextbox").val("");
                    }
                } catch (e) {
                    $("#ScheduledTransferBeginningDateTextbox").val("");
                }
            } else {
                initialDateTime = $.datepicker.parseTime("h:mm tt", TransfersReactObject.Settings.transferConfiguration.ScheduledTransferTimeOptions.DefaultStartTime);
            }
            if (initialDateTime !== false) {
                startDateTimePickerOptions.hour = initialDateTime.hour;
                if (initialDateTime.hour < new Date().getHours()) {
                    startDateTimePickerOptions.defaultDate = "+1d";
                }
            }
        } else if (TransfersReactObject.Settings.transferConfiguration.ScheduledTransferTimeOptions) {
            $("#CustomStartTimeInstructionsDiv").hide();

            // No custom time
            if (typeof $("#FixedStartTimeInstructions").data("original-value") === "undefined") {
                $("#FixedStartTimeInstructions").data("original-value", $("#FixedStartTimeInstructions").text());
            }
            $("#FixedStartTimeInstructions").text(
                HomeBanking.Utilities.String.Format(
                    $("#FixedStartTimeInstructions").data("original-value"),
                    TransfersReactObject.Settings.transferConfiguration.ScheduledTransferTimeOptions.FixedRangeStartTime,
                    TransfersReactObject.Settings.transferConfiguration.ScheduledTransferTimeOptions.FixedRangeEndTime
                )
            );

            $("#FixedStartTimeInstructionsDiv").slideDown();

            startDateTimePickerOptions.showTimepicker = false; // Don't show time picker

            // Set minDate to tomorrow if we've already passed the fixed start time
            var oFixedHourInfo = $.datepicker.parseTime("h:mm tt", TransfersReactObject.Settings.transferConfiguration.ScheduledTransferTimeOptions.FixedRangeStartTime);
            if (oFixedHourInfo !== false && oFixedHourInfo.hour < new Date().getHours()) {
                startDateTimePickerOptions.minDate = "+1d";
            }
        }

        // attach datepicker to beginning date input
        $("#ScheduledTransferBeginningDateTextbox").datetimepicker(startDateTimePickerOptions);

        // ending date picker:
        $("#ScheduledTransferEndingDateTextbox").datepicker({
            autoSize: true,
            dateFormat: "M d, yy",
            maxDate: "+1825d",      // 5 years is enough?
            minDate: startDateTimePickerOptions.minDate,
            onSelect: function () { } /* workaround for IE validator bug */
        });
    }


    // Determines whether or not a transferring from this loan should display a loan advance warning message.      @param {} loan  @param {String[]} cashAdvanceWarningLoanCategories 
    const _doesLoanQualifyForLoanAdvanceWarning = (loan, cashAdvanceWarningLoanCategories) => {
        if (cashAdvanceWarningLoanCategories === null || cashAdvanceWarningLoanCategories.count < 1) {
            return false;
        }
        return (TransfersReactObject.Settings.cashAdvanceConfigSettings.cashAdvanceFromCreditCardsEnabled.toLocaleLowerCase() === "true" &&
            loan.slType === "LOAN" && $.inArray(loan.Category, cashAdvanceWarningLoanCategories) > -1);
    }


    // Indicates whether either of the selected accounts is a linked account. returns bool
    const _selectedAccountsInvolvesLinkedAccount = () => {
        return (_selectedFromAccount !== null && _selectedFromAccount.slType === "LINKED") || (_selectedToAccount !== null && _selectedToAccount.slType === "LINKDED");
    }


    // Sets up the scheduled transfer frequencies dropdown with the allowed frequency types for the currently selected accounts - Currently this only affects "LINKED" accounts.
    const _setupScheduleTransferFrequencies = () => {
        var allowedFrequencyTypes = TransfersReactModule.getAllowedScheduleTransferFrequencies();

        if (allowedFrequencyTypes === null) {
            // All types allowed
            $("#ScheduledTransferFrequencySelect").find("option").prop("disabled", false);
        } else {
            $("#ScheduledTransferFrequencySelect").find("option").each(function (iIndex, optionItem) {
                optionItem = $(optionItem);
                if (optionItem.val() !== "" && $.inArray(optionItem.val(), allowedFrequencyTypes) === -1) {
                    optionItem.prop("disabled", true);
                } else {
                    optionItem.prop("disabled", false);
                }
            });
        }

        if (TransfersReactObject.Settings.restrictScheduleToOneTimeOnly) {
            TransfersReactModule.restrictTransferFrequencyToOneTime();
        }
    };


    // Some accounts only allow certain scheduled transfer frequencies. This method resolves the allowed frequencies, or null if all should be allowed. - Currently this only affects "LINKED" accounts.
    // returns  An array of scheduled transfer frequencies to allow, all others should be disallowed, or null if all should be allowed.
    // The ScheduledTransferType enum =  Undefined = -1     OneTime = 0     Daily = 1    Weekly = 2     BiWeekly = 3    TwiceMonthly = 4    Monthly = 5     Yearly = 6
    const _getAllowedScheduleTransferFrequencies = () => {
        if ((_selectedFromAccount === null || typeof _selectedFromAccount === "undefined") && (_selectedToAccount === null || typeof _selectedToAccount === "undefined")) {
            return null;
        }

        var allowedFrequencyTypes = [];
        var allowedFromFrequencyTypes = [];

        if (_selectedFromAccount !== null && typeof _selectedFromAccount !== "undefined" && $.isArray(_selectedFromAccount.scheduledTransferFromAllowedTypes)) {
            $.each(_selectedFromAccount.scheduledTransferFromAllowedTypes, function (iIndex, fromAllowedType) {
                allowedFromFrequencyTypes.push(fromAllowedType.ScheduledTransferType);
            });
        }

        if (_selectedToAccount !== null && typeof _selectedToAccount !== "undefined" && typeof _selectedToAccount.scheduledTransferToAllowedTypes !== "undefined"
            && $.isArray(_selectedToAccount.scheduledTransferToAllowedTypes)) {
            $.each(_selectedToAccount.scheduledTransferToAllowedTypes, function (iIndex, toAllowedType) {
                if (allowedFromFrequencyTypes.length === 0) {
                    // All "from" frequencies are allowed, allow all "to" allowed frequencies
                    allowedFrequencyTypes.push(toAllowedType.ScheduledTransferType);
                } else if ($.inArray(toAllowedType.ScheduledTransferType, allowedFromFrequencyTypes) !== -1) {
                    // This "to" frequency is in the from frequency, add it to final calculation
                    allowedFrequencyTypes.push(toAllowedType.ScheduledTransferType);
                }
            });
        } else {
            // No account selected or no restrictions, just use the "from" allowed frequencies
            allowedFrequencyTypes = allowedFromFrequencyTypes;
        }

        return (allowedFrequencyTypes.length === 0) ? null : allowedFrequencyTypes;
    };


    // Gets the maximum end after occurrence for the specified scheduled transfer type.
    // The ScheduledTransferType enum =  Undefined = -1     OneTime = 0     Daily = 1    Weekly = 2     BiWeekly = 3    TwiceMonthly = 4    Monthly = 5     Yearly = 6
    // returns {Number} The maximum end after occurrence count for the specified scheduled transfer type.
    const _getMaximumEndAfterOccurrenceCount = (scheduledTransferType) => {
        if (TransfersReactObject.Settings.transferConfiguration === null || !$.isArray(TransfersReactObject.Settings.transferConfiguration.ScheduledTransferMaximumEndAfterOccurrences)) {
            return null;
        }

        var endAfterNumber = isFinite(TransfersReactObject.Settings.ScheduledTransferGlobalMaximumEndAfterOccurrences) ? Number(TransfersReactObject.Settings.ScheduledTransferGlobalMaximumEndAfterOccurrences) : null;

        $.each(TransfersReactObject.Settings.ScheduledTransferMaximumEndAfterOccurrences, function (iIndex, oOccurrence) {
            if (oOccurrence.ScheduledTransferType === scheduledTransferType && isFinite(oOccurrence.EndAfter)) {
                if (endAfterNumber !== null && Number(oOccurrence.EndAfter) < endAfterNumber) {
                    // If this transfer type end after count is less than global count, then it becomes the effective maximum
                    endAfterNumber = Number(oOccurrence.EndAfter);
                }

                return false; //break;
            }
        });

        return endAfterNumber;
    };


    // Resolves the subaccount ID based on the specified sub-account type. retuns string for the id
    const _getSubAccountId = function (subAccountType, account) {
        switch (subAccountType) {
            case "S":
            case "L":
                return account.suffix;

            case "CREDIT":
                return account.cardNumber;

            case "LINKED":
                return account.achID;
        }

        return null;
    };


    // Called when a transfer has been successful.
    var _transferSuccessHandler = (transferData, fromAccount, toAccount, replyObject) => {
        $("#transferProgressDiv").hide();
        $("#confirmTransferDescriptionDiv").hide();
        $("#transferConfirmButton").hide();
        $("#transferCancelButton").hide();
        $("#transferPrintButton").slideDown();
        $("#transferDismissButton").slideDown();

        $("#transferSuccessDiv").html(TransfersReactObject.Settings.Literals.transferSuccessfulMessageText);
        $("#transferSuccessDiv").slideDown();
        $("#transferSuccessDiv").focus();

        // Transfer confirmation details
        if ($.isPlainObject(transferData)) {
            var resultString = "";

            resultString += "<dl class='dl-horizontal'>";

            resultString += "<dt class='visible-print'>Date</dt>";
            resultString += "<dd>" + replyObject.effectiveDate + "</dd>";

            resultString += "<dt>Amount</dt>";
            resultString += "<dd>" + HomeBanking.Utilities.Currency.FormatCentsToDollars(transferData.Amount) + "</dd>";

            resultString += "<dt>Reference #</dt>";
            resultString += "<dd>" + replyObject.referenceNumber + "</dd>";

            if (typeof transferData.TransferDescription !== "undefined" && !HomeBanking.Utilities.String.IsNullOrEmpty(transferData.TransferDescription)) {
                resultString += "<dt>Transfer Description</dt>";
                resultString += "<dd>" + transferData.TransferDescription + "</dd>";
            }

            resultString += "<dt>From</dt>";
            resultString += "<dd class='transfer-confirm-offset-definition'>" + fromAccount.longDescription + "</dd>";

            if (!HomeBanking.Utilities.String.IsNullOrEmpty(fromAccount.balance) && !TransfersReactObject.Settings.hidePreviousBalanceAndPreviousAvailable) {
                resultString += "<dt>Previous Balance</dt>";
                resultString += "<dd>" + HomeBanking.Utilities.Currency.FormatCentsToDollars(fromAccount.balance) + "</dd>";
            }

            if (!HomeBanking.Utilities.String.IsNullOrEmpty(fromAccount.available) && !TransfersReactObject.Settings.hidePreviousBalanceAndPreviousAvailable) {
                resultString += "<dt>Previous Available</dt>";
                resultString += "<dd>" + HomeBanking.Utilities.Currency.FormatCentsToDollars(fromAccount.available) + "</dd>";
            }

            if (!HomeBanking.Utilities.String.IsNullOrEmpty(replyObject.fromBalance)) {
                resultString += "<dt>New Balance</dt>";
                resultString += "<dd>" + HomeBanking.Utilities.Currency.FormatCentsToDollars(replyObject.fromBalance) + "</dd>";
            }

            if (!HomeBanking.Utilities.String.IsNullOrEmpty(replyObject.fromAvailable)) {
                resultString += "<dt>New Available</dt>";
                resultString += "<dd>" + HomeBanking.Utilities.Currency.FormatCentsToDollars(replyObject.fromAvailable) + "</dd>";
            }

            resultString += "<dt>To</dt>";
            resultString += "<dd class='transfer-confirm-offset-definition'>" + toAccount.longDescription + "</dd>";

            if (!HomeBanking.Utilities.String.IsNullOrEmpty(toAccount.balance) && !TransfersReactObject.Settings.hidePreviousBalanceAndPreviousAvailable) {
                resultString += "<dt>Previous Balance</dt>";
                resultString += "<dd>" + HomeBanking.Utilities.Currency.FormatCentsToDollars(toAccount.balance) + "</dd>";
            }

            if (!HomeBanking.Utilities.String.IsNullOrEmpty(toAccount.available) && !TransfersReactObject.Settings.hidePreviousBalanceAndPreviousAvailable) {
                resultString += "<dt>Previous Available</dt>";
                resultString += "<dd>" + HomeBanking.Utilities.Currency.FormatCentsToDollars(toAccount.available) + "</dd>";
            }

            if (!HomeBanking.Utilities.String.IsNullOrEmpty(replyObject.toBalance)) {
                resultString += "<dt>New Balance</dt>";
                resultString += "<dd>" + HomeBanking.Utilities.Currency.FormatCentsToDollars(replyObject.toBalance) + "</dd>";
            }

            if (!HomeBanking.Utilities.String.IsNullOrEmpty(replyObject.toAvailable)) {
                resultString += "<dt>New Available</dt>";
                resultString += "<dd>" + HomeBanking.Utilities.Currency.FormatCentsToDollars(replyObject.toAvailable) + "</dd>";
            }

            if (!HomeBanking.Utilities.String.IsNullOrEmpty(replyObject.toPayoff)) {
                resultString += "<dt>Payoff Balance</dt>";
                resultString += "<dd>" + HomeBanking.Utilities.Currency.FormatCentsToDollars(replyObject.toPayoff) + "</dd>";
            }

            if (toAccount.allowIRAPreviousYear === true && !$("#ScheduledTransferCheckbox").is(":checked")) {
                resultString += "<dt>Tax Year</dt>";
                resultString += "<dd>" + transferData.IRATaxYear + "</dd>";
            }

            if (typeof replyObject.additionalMessage !== "undefined" && !HomeBanking.Utilities.String.IsNullOrEmpty(replyObject.additionalMessage)) {
                resultString += "<dt>Additional Message</dt>";
                resultString += "<dd>" + replyObject.additionalMessage + "</dd>";
            }

            resultString += "</dl>";

            $("#transferCompletedDetailsDiv").html(resultString);
            $("#transferCompletedDetailsDiv").slideDown();
            $("#transferCompletedDetailsDiv").focus();
        }

        // Reload module:
        TransfersReactModule.loadMember();
        TransfersReactModule.initializeDateTimePickers();
        TransfersReactModule.resetTransfersForm();

        _additionalTransferOptionsAreVisible = false;
        _additionalToPrincipalShouldBeOpen = false;
        _principalOnlyShouldBeOpen = false;
        _iraContributionYearShouldBeOpen = false;
    };


    // Called when a transfer has failed.
    const _transferFailureHandler = () => {
        $("#transferProgressDiv").hide();
        $("#confirmTransferDescriptionDiv").hide();
        $("#transferConfirmButton").hide();
        $("#transferCancelButton").hide();
        $("#transferDismissButton").slideDown();

        $("#transferFailedDiv").html(TransfersReactObject.Settings.Literals.transferFailurefulMessageText);
        $("#transferFailedDiv").slideDown();
        $("#transferFailedDiv").focus();
    };

    // Called when a scheduled transfer has been successful.
    const _scheduledTransferSuccessHandler = (transferData, fromAccount, toAccount) => {
        $("#transferProgressDiv").hide();
        $("#confirmTransferDescriptionDiv").hide();
        $("#dlScheduledTransferDetails").hide();
        $("#transferConfirmButton").hide();
        $("#transferCancelButton").hide();
        $("#transferPrintButton").slideDown();
        $("#transferDismissButton").slideDown();

        $("#transferSuccessDiv").html("Success");
        $("#transferSuccessDiv").slideDown();
        $("#transferSuccessDiv").focus();

        var amountInCents = HomeBanking.Utilities.Currency.FormatCentsToDollars(transferData.AmountInCents.toString());     // this function wont take an int for some reason
        var fromAccountDescription = fromAccount.longDescription;
        var toAccountDescription = toAccount.longDescription;

        $("#transferCompletedDetailsDiv").html(HomeBanking.Utilities.String.Format(
            TransfersReactObject.Settings.Literals.scheduledTransferSuccessfulMessageText,
            amountInCents,
            fromAccountDescription,
            toAccountDescription)
        );
        $("#transferCompletedDetailsDiv").slideDown();

        // Reload module:
        $("#ScheduledTransferCheckbox").trigger('click');
        TransfersReactModule.loadMember();
        TransfersReactModule.initializeDateTimePickers();
        TransfersReactModule.resetTransfersForm();
    };


    // Called when a scheduled transfer has failed.
    const _scheduledTransferFailureHandler = () => {
        $("#transferProgressDiv").hide();
        $("#confirmTransferDescriptionDiv").hide();
        $("#dlScheduledTransferDetails").hide();
        $("#transferConfirmButton").hide();
        $("#transferCancelButton").hide();
        $("#transferDismissButton").slideDown();

        $("#transferFailedDiv").html(TransfersReactObject.Settings.Literals.scheduledTransferFailureMessageText);
        $("#transferFailedDiv").slideDown();
        $("#transferFailedDiv").focus();
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


    //  Enable printing of modal when the "print" button is clicked in the confirmation modal from key press (ADA Compliance)
    const _printPageFromKeyPress = (e) => {
        var currTarget = e.target;

        if (e.key === "Enter") {
            _printPage(e)
        }
    };


    // Restore the print area of the page on modal dismissal
    const _handleConfirmModalClosed = () => {
        $("#master-page-div").removeClass("hidden-print");
        $("body").removeClass("modal-open");

        TransfersReactModule.initializeDateTimePickers();
        TransfersReactModule.resetTransfersForm();
    };


    // Restore the print area of the page on modal dismissal (ADA Compliance)
    const _handleConfirmModalClosedFromKeyPress = (e) => {
        var currTarget = e.target;

        if (e.key === "Enter") {
            TransfersReactModule.handleConfirmModalClosed()
        }
    };


    // Restore the print area of the page on modal dismissal
    const _handleConfirmModalClosedWithPageReset = () => {
        $("#master-page-div").removeClass("hidden-print");
        $("body").removeClass("modal-open");

        // show the loading spinner:
        $("#TransfersLoadingDataDiv").slideDown();

        // empty the member to hide transfer form:
        TransfersAreaComponent.resetLoadingState();
        $(".scheduled-tab-content").hide();

        // reload everything:
        TransfersReactModule.loadMember();
        TransfersReactModule.initializeDateTimePickers();
        TransfersReactModule.resetTransfersForm();

        // reload the 'scheduled transfers' tab:
        if (ScheduledTransfersAreaComponent && ScheduledTransfersReactModule) {
            ScheduledTransfersAreaComponent.signalLoaded(true, 0)   // isLoading, data.length ... basically this is a reset so it will reload
            ScheduledTransfersReactModule.loadScheduledTransfers(); // reload scheduled transfers to the 'Scheduled Transfers' tab/view
        }

        // TODO:
        // reload the 'Monthly' tab
    };


    // Restore the print area of the page on modal dismissal and reload page (ADA Compliance)
    const _handleConfirmModalClosedWithPageResetFromKeyPress = (e) => {
        var currTarget = e.target;

        if (e.key === "Enter") {
            TransfersReactModule.handleConfirmModalClosed()
        }
    };


    // check the query string settings for preset amount, 'to' account, and if scheduled or not
    const _calculateQueryStringItems = () => {
        //console.log("Got here: _calculateQueryStringItems. TransfersReactObject.Settings.QueryString = ", TransfersReactObject.Settings.QueryString);

        var qsSettings = TransfersReactObject.Settings.QueryString;

        // pre-populate amount:
        if (!HomeBanking.Utilities.String.IsNullOrEmpty(qsSettings.amount)) {
            document.getElementById("TransferAmountTextbox").value = HomeBanking.Utilities.Currency.FormatCentsToDollars(qsSettings.amount).replace(/^\$/, "");
        }

        // pre-select 'to' account:
        if (typeof qsSettings.toAccount !== "undefined" && qsSettings.toAccount !== null) {
            $("#TransfersToSelect").find("option").each(function () {
                var preSelectedToAccountCandidate = _getUserAccountById($(this).attr("value"));

                if (!$.isPlainObject(preSelectedToAccountCandidate)) {
                    return;
                }

                // if the account is the preselected 'to' account, then select it in the drop-down:	
                if (preSelectedToAccountCandidate.isPreSelectedToAccount) {
                    if (!$(this).is(":selected")) {
                        $("#TransfersToSelect").val(preSelectedToAccountCandidate.id);
                        if (preSelectedToAccountCandidate !== null && preSelectedToAccountCandidate.allowExtraToPrincipal === true) {
                            $("#AdditionalToPrincipalDiv").slideDown();
                        }
                    }
                }
            });
        }


        // check schedule for later date checkbox:
        if (TransfersReactObject.Settings.transferConfiguration.AllowScheduledTransfers === true && qsSettings.scheduled) {
            $("#ScheduledTransferCheckbox").click();
        }

        // If there was a default account/amount selected on load, remove so it's not re-selected again
        TransfersReactObject.Settings.QueryString.amount = null;
        TransfersReactObject.Settings.QueryString.toAccount = null;
    };


    // try to determine if the pre-determined "To" account suffix and type from the query string matches any of our member accounts
    const _preSelectedToAccountMatches = (candidateAccount, candidateAccountType, accountType, accountId, householdAccountId) => {
        if (!$.isPlainObject(candidateAccount) ||
            typeof (candidateAccountType) !== "string" ||
            HomeBanking.Utilities.String.IsNullOrEmpty(candidateAccountType) ||
            typeof (accountType) !== "string" ||
            HomeBanking.Utilities.String.IsNullOrEmpty(accountType) ||
            typeof (accountId) !== "string" ||
            HomeBanking.Utilities.String.IsNullOrEmpty(accountId)) {
            return false;
        }

        if (candidateAccountType !== accountType) {
            // Account types differ
            return false;
        }

        if (candidateAccount.householdingAccountId && householdAccountId !== candidateAccount.householdingAccountId) {
            // Household accounts differ
            return false;
        }

        switch (accountType) {
            case "S":
            case "L":
                if (candidateAccount.suffix === accountId) {
                    return true;
                }
                break;

            case "CREDIT":
                if (candidateAccount.cardNumber === accountId) {
                    return true;
                }
                break;

            case "LINKED":
                if (candidateAccount.achID === accountId) {
                    return true;
                }
                break;
        }

        return false;
    }


    // if on dashboard, and oAppConfig.DashboardScheduledOneTimeOnly is true, shut off all other frequencies besides 'one time only'
    const _restrictTransferFrequencyToOneTime = () => {
        $("#ScheduledTransferFrequencySelect").find("option").each(function () {
            if (parseInt($(this).val()) > 0) {
                $(this).prop("disabled", true);
            }
        });
    }


    // If the client is using the 'group additional options' option, then handle the collapse and expand events:
    const _expandCollapseAdditionalTransferItems = () => {
        if (_additionalTransferOptionsAreVisible) {
            $("#CollapseExpandImg").attr("src", TransfersReactObject.Settings.iconExpandUrl);

            $("#AdditionalToPrincipalDiv").slideUp();
            $("#PrincipalOnlyDiv").slideUp();
            $("#IraContributionYearDiv").slideUp();
            $("#ScheduledTransfersSectionDiv").slideUp();     

            _additionalTransferOptionsAreVisible = false;       // the additional items are NOT visible
        } else {
            if (_additionalToPrincipalShouldBeOpen) {
                $("#AdditionalToPrincipalDiv").slideDown();
            }

            if (_principalOnlyShouldBeOpen) {
                $("#PrincipalOnlyDiv").slideDown();
            }

            if (_iraContributionYearShouldBeOpen) {
                $("#IraContributionYearDiv").slideDown();
            }

            if (TransfersReactObject.Settings.transferConfiguration.AllowScheduledTransfers) {
                $("#ScheduledTransfersSectionDiv").slideDown();                 // show the 'schedule for a later date' checkbox
                $("#ScheduledTransferCheckbox").prop('checked', false);         // uncheck 'schedule for a later date' checkbox
            }
 
            // expose group section only if at least one of the above is true
            if (_additionalToPrincipalShouldBeOpen || _principalOnlyShouldBeOpen || _iraContributionYearShouldBeOpen || TransfersReactObject.Settings.transferConfiguration.AllowScheduledTransfers) {
                $("#CollapseExpandImg").attr("src", TransfersReactObject.Settings.iconCollapseUrl);     // change src on collapse/expand img
                _additionalTransferOptionsAreVisible = true;       // the additional items are visible     
            }
        }
    }


    // Public interface:
    return {
        loadMember: _loadMember,
        scheduledTransfers: _scheduledTransfers,
        setMemberAccounts: _setMemberAccounts,
        getValidTransferAccountsForSelectedAccount: _getValidTransferAccountsForSelectedAccount,
        setFeeAccounts: _setFeeAccounts,
        calculateFromAccountSelect: _calculateFromAccountSelect,
        calculateToAccountSelect: _calculateToAccountSelect,
        calculateFeeAccountSelect: _calculateFeeAccountSelect,
        showTransferDescriptionPopover: _showTransferDescriptionPopover,
        showRegdDescriptionPopover: _showRegdDescriptionPopover,
        validateScheduledTransferForm: _validateScheduledTransferForm,
        validateScheduledTransferFormFromKeyPress: _validateScheduledTransferFormFromKeyPress,
        submitTransferForm: _submitTransferForm,
        submitTransferFormFromKeyPress: _submitTransferFormFromKeyPress,
        resetTransfersForm: _resetTransfersForm,
        resetTransfersFormFromKeyPress: _resetTransfersFormFromKeyPress,
        maskAccount: _maskAccount,
        trimNetDate: _trimNetDate,
        formatNetDateForPaymentDeliverByDate: _formatNetDateForPaymentDeliverByDate,
        toggleScheduledTransferSection: _toggleScheduledTransferSection,
        changeScheduledTransferFrequencySubSections: _changeScheduledTransferFrequencySubSections,
        hideScheduledTransferSubSections: _hideScheduledTransferSubSections,
        resetRecurringSectionValidation: _resetRecurringSectionValidation,
        mapMemberItemsForFromDropDown: _mapMemberItemsForFromDropDown,
        mapMemberItemsForToDropDown: _mapMemberItemsForToDropDown,
        mapFeeItemsForDropDown: _mapFeeItemsForDropDown,
        buildOptGroupItems: _buildOptGroupItems,
        getUserAccountById: _getUserAccountById,
        examineToAndFromAccounts: _examineToAndFromAccounts,
        setSelectedFeeAccount: _setSelectedFeeAccount,
        validateAmountKeyEntries: _validateAmountKeyEntries,
        formatTransferAmountField: _formatTransferAmountField,
        filterSelectLists: _filterSelectLists,
        checkAccountExistsInValidTransferAccounts: _checkAccountExistsInValidTransferAccounts,
        handlePrincipalOnlyCheckboxChange: _handlePrincipalOnlyCheckboxChange,
        handleAdditionalPrincipalCheckboxChange: _handleAdditionalPrincipalCheckboxChange,
        calculateIraYearContributionsSelect: _calculateIraYearContributionsSelect,
        showTransferConfirmationModal: _showTransferConfirmationModal,
        isTransferOccurrencePatternDisabled: _isTransferOccurrencePatternDisabled,
        initializeDateTimePickers: _initializeDateTimePickers,
        doesLoanQualifyForLoanAdvanceWarning: _doesLoanQualifyForLoanAdvanceWarning,
        selectedAccountsInvolvesLinkedAccount: _selectedAccountsInvolvesLinkedAccount,
        setupScheduleTransferFrequencies: _setupScheduleTransferFrequencies,
        getAllowedScheduleTransferFrequencies: _getAllowedScheduleTransferFrequencies,
        getMaximumEndAfterOccurrenceCount: _getMaximumEndAfterOccurrenceCount,
        getSubAccountId: _getSubAccountId,
        printPage: _printPage,
        printPageFromKeyPress: _printPageFromKeyPress,
        handleConfirmModalClosed: _handleConfirmModalClosed,
        handleConfirmModalClosedFromKeyPress: _handleConfirmModalClosedFromKeyPress,
        handleConfirmModalClosedWithPageReset: _handleConfirmModalClosedWithPageReset,
        handleConfirmModalClosedWithPageResetFromKeyPress: _handleConfirmModalClosedWithPageResetFromKeyPress,
        transferSuccessHandler: _transferSuccessHandler,
        transferFailureHandler: _transferFailureHandler,
        scheduledTransferSuccessHandler: _scheduledTransferSuccessHandler,
        scheduledTransferFailureHandler: _scheduledTransferFailureHandler,
        calculateQueryStringItems: _calculateQueryStringItems,
        preSelectedToAccountMatches: _preSelectedToAccountMatches,
        restrictTransferFrequencyToOneTime: _restrictTransferFrequencyToOneTime,
        handleScheduledTransferSectionCheckboxKeyPress: _handleScheduledTransferSectionCheckboxKeyPress,
        expandCollapseAdditionalTransferItems: _expandCollapseAdditionalTransferItems
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



// TRANSFERS AREA:
class TransfersArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memberLoaded: false
        };
    }

    componentDidMount() {
        window.TransfersAreaComponent = this;    // so this component can be reached by the TransfersReactModule code
        TransfersReactModule.loadMember();
        TransfersReactModule.initializeDateTimePickers();
    }

    componentWillUpdate() {
    }

    componentWillUnmount() {
    }

    updateMemberState() {
        this.setState({
            memberLoaded: true
        })
    }

    resetLoadingState() {
        this.setState({
            memberLoaded: false
        })
    }


    // render method
    render() {
        if (this.state.memberLoaded === false) {
            return (
                <div>{/*<!-- dont show anything until member info loads-->*/}</div>
            )
        }

        return (
            <div className="transfers-container" aria-live="assertive">

                <div id="TransfersSavingDataDiv" style={{ display: 'none' }} >
                    <img src={TransfersReactObject.Settings.spinnerFilename} alt="Saving…" />&nbsp;Saving...
					</div>

                <div id="TransfersValidationDiv" style={{ display: 'none' }} tabIndex="0">
                    Please correct the following errors:
					</div>

                <div id="TransfersErrorDiv" style={{ display: 'none' }} tabIndex="0">
                    Sorry, there was an error. Please try again later.
					</div>

                <div id="TransfersSuccessDiv" style={{ display: 'none' }} tabIndex="0">
                    <div>The Transfer information was succefully saved.</div>
                </div>

                <div id="DeleteTransferSuccessDiv" style={{ display: 'none' }} tabIndex="0">
                    <div>The Transfer was canceled. </div>
                </div>

                <form id="TransfersForm" aria-live="assertive">
                    {/* "FROM" SELECT ITEMS GROUP */}
                    {/* "FROM" SELECT ITEMS GROUP */}
                    {/* "FROM" SELECT ITEMS GROUP */}
                    <div className="form-container">
                        <div className="sub-div div-1">
                            <span className="form-label">{TransfersReactObject.Settings.Literals.labelFromText}</span>
                        </div>

                        <div className="sub-div div-2">
                            {TransfersReactModule.calculateFromAccountSelect()}
                        </div>
                    </div>

                    <div id="RegdDetailsDiv" style={{ display: "none" }} aria-live="assertive">
                        <div className="form-container">
                            <div className="sub-div div-1">
                                {/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <strong>{TransfersReactObject.Settings.Literals.regdHeaderText}</strong>&nbsp;<span id="RegdWithdrawlsSpan"></span>
                            </div>
                        </div>

                        <div id="RegdDetailsDiv" className="form-container">
                            <div className="sub-div div-1">
                                {/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <span>{TransfersReactObject.Settings.Literals.regdExplanationText}</span>
                                <span className="glyphicon glyphicon-question-sign regd-descr-explanation-popover" data-toggle="popover" data-placement="bottom" data-trigger="hover click"
                                    data-content={TransfersReactObject.Settings.Literals.regdPopupText} aria-label={TransfersReactObject.Settings.Literals.regdPopupText}
                                    onMouseOver={TransfersReactModule.showRegdDescriptionPopover} role="Tooltip" placement="bottom">
                                </span>
                            </div>
                        </div>
                    </div>

                    <div id="TransferFromLimitsDiv" style={{ display: "none" }}>
                        <div className="form-container">
                            <div className="sub-div div-1">
                                {/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <strong>{TransfersReactObject.Settings.Literals.transferFromText}</strong>&nbsp;<span id="TransferFromLimitSpan"></span>
                            </div>
                        </div>
                    </div>

                    <div id="Hours24TransferFromLimitsDiv" style={{ display: "none" }} aria-live="assertive">
                        <div className="form-container">
                            <div className="sub-div div-1">{/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <strong>{TransfersReactObject.Settings.Literals.hours24transferFromText}</strong>&nbsp;<span id="Hours24TransferFromLimitSpan"></span>
                            </div>
                        </div>
                    </div>

                    <div id="FeeFromDiv" style={{ display: "none" }} aria-live="assertive">
                        <div className="form-container">
                            <div className="sub-div div-1">{/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <strong>{TransfersReactObject.Settings.Literals.feeFromText}</strong>&nbsp;<span id="FeeFromSpan"></span>
                            </div>
                        </div>
                    </div>

                    <div id="FreeRemainingFromDiv" style={{ display: "none" }} aria-live="assertive">
                        <div className="form-container">
                            <div className="sub-div div-1">{/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <strong>{TransfersReactObject.Settings.Literals.freeRemainingFromText}</strong>&nbsp;<span id="FreeRemainingFromSpan"></span>
                            </div>
                        </div>
                    </div>




                    {/* "TO" SELECT ITEMS GROUP */}
                    {/* "TO" SELECT ITEMS GROUP */}
                    {/* "TO" SELECT ITEMS GROUP */}
                    <div className="form-container">
                        <div className="sub-div div-1">
                            <span className="form-label">{TransfersReactObject.Settings.Literals.labelToText}</span>
                        </div>

                        <div className="sub-div div-2">
                            {TransfersReactModule.calculateToAccountSelect()}
                        </div>
                    </div>

                    <div id="ToAndFromAccountsAreSameWarningDiv" style={{ display: "none" }} tabIndex="0">
                        <div className="form-container">
                            <div className="sub-div div-1">{/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <div className="label-danger">{TransfersReactObject.Settings.Literals.validationMessageSourceAndDesinationAccountsMustBeDifferentText}</div>
                            </div>
                        </div>
                    </div>

                    <div id="TransferToLimitsDiv" style={{ display: "none" }} aria-live="assertive">
                        <div className="form-container">
                            <div className="sub-div div-1">
                                {/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <strong>{TransfersReactObject.Settings.Literals.transferToText}</strong>&nbsp;<span id="TransferToLimitSpan"></span>
                            </div>
                        </div>
                    </div>

                    <div id="Hours24TransferToLimitsDiv" style={{ display: "none" }} aria-live="assertive">
                        <div className="form-container">
                            <div className="sub-div div-1">
                                {/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <strong>{TransfersReactObject.Settings.Literals.hours24transferToText}</strong>&nbsp;<span id="Hours24TransferToLimitSpan"></span>
                            </div>
                        </div>
                    </div>

                    <div id="FeeToDiv" style={{ display: "none" }} aria-live="assertive">
                        <div className="form-container">
                            <div className="sub-div div-1">
                                {/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <strong>{TransfersReactObject.Settings.Literals.feeFromText}</strong>&nbsp;<span id="FeeToSpan"></span>
                            </div>
                        </div>
                    </div>

                    <div id="FreeRemainingToDiv" style={{ display: "none" }} aria-live="assertive">
                        <div className="form-container">
                            <div className="sub-div div-1">
                                {/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <strong>{TransfersReactObject.Settings.Literals.freeRemainingToText}</strong>&nbsp;<span id="FreeRemainingToSpan"></span>
                            </div>
                        </div>
                    </div>


                    {/* "FEE" SELECT */}
                    <div id="FeeSelectDiv" style={{ display: "none" }} aria-live="assertive">
                        <div className="form-container">
                            <div className="sub-div div-1">
                                <span className="form-label">Fee Source</span>
                            </div>

                            <div className="sub-div div-2">
                                {TransfersReactModule.calculateFeeAccountSelect()}
                            </div>
                        </div>
                    </div>

                    {/* Mortgage warning Div */}
                    <div id="MortgageWarningDiv" style={{ display: "none" }} aria-live="assertive">
                        <div className="form-container">
                            <div className="sub-div div-1">
                                {/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <div dangerouslySetInnerHTML={{ __html: TransfersReactObject.Settings.Literals.transferToMortgageOnscreenMessageText }} />
                            </div>
                        </div>
                    </div>


                    {/* "AMOUNT" ITEMS */}
                    <div className="form-container">
                        <div className="sub-div div-1">
                            <label className="form-label" htmlFor="TransferAmountTextbox">{TransfersReactObject.Settings.Literals.labelAmountText}</label>
                        </div>

                        <div className="sub-div div-2 input-group">
                            <div id="amountValidationDiv" style={{ display: "inline-block" }}>
                                <div className="form-control input-group-addon">$</div><input className="addon-input" id="TransferAmountTextbox" name="TransferAmountTextbox" type="text" tabIndex="0"
                                    placeholder="00.00" onKeyUp={TransfersReactModule.validateAmountKeyEntries} onBlur={TransfersReactModule.formatTransferAmountField} autoComplete="off" />
                            </div>
                        </div>
                    </div>

                    {/* TRANSFER DESCRIPTION */}
                    <div className="form-container">
                        <div className="sub-div div-1">
                            <label className="form-label" htmlFor="TransferDescriptionTextbox">{TransfersReactObject.Settings.Literals.labelTransferDescriptionText}</label>
                            <span className="glyphicon glyphicon-question-sign tran-descr-explanation-popover" data-toggle="popover" data-placement="auto" data-trigger="hover click"
                                data-content="Optional: This text will be displayed in your account's transaction history." aria-label="Optional: This text will be displayed in your account's transaction history."
                                onMouseOver={TransfersReactModule.showTransferDescriptionPopover} role="Tooltip"></span>

                        </div>

                        <div className="sub-div div-2">
                            <input type="text" id="TransferDescriptionTextbox" name="TransferDescriptionTextbox" placeholder="Enter Description (optional)" tabIndex="0" className="form-control" />
                        </div>
                    </div>

                    {/* ADDITIONAL TRANSFER OPTIONS EXPAND / COLLAPSE */}
                    <div id="AdditionalTransferItemsCollapseExpand" className="" style={{ display: TransfersReactObject.Settings.groupAdditionalTransferOptions ? "block" : "none" }}>                       
                        <div className="form-container">
                            <div className="sub-div div-1">
                                <span>{TransfersReactObject.Settings.Literals.additionalTransferOptionsText}</span>        
                            </div>

                            <div className="sub-div div-2">
                                <img id="CollapseExpandImg" src={TransfersReactObject.Settings.iconExpandUrl} style={{ cursor: "pointer" }} alt="collapse expand icon"
                                    onClick={TransfersReactModule.expandCollapseAdditionalTransferItems} />
                            </div>
                        </div>
                    </div>
                    

                    {/* ADDITIONAL TO PRINCIPAL */}
                    <div id="AdditionalToPrincipalDiv" style={{ display: "none" }}>
                        <div className="form-container">
                            <div className="sub-div div-1">
                                {/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <input type="checkbox" id="AdditionalToPrincipalCheckbox" name="AdditionalToPrincipalCheckbox" onChange={TransfersReactModule.handleAdditionalPrincipalCheckboxChange} tabIndex="0" />&nbsp;
										{TransfersReactObject.Settings.Literals.additionalToPrincipalText}
                            </div>
                        </div>
                    </div>

                    {/* PRINCIPAL ONLY */}
                    <div id="PrincipalOnlyDiv" style={{ display: "none" }}>
                        <div className="form-container">
                            <div className="sub-div div-1">
                                {/*<!-- sp -->*/}
                            </div>

                            <div className="sub-div div-2">
                                <input type="checkbox" id="PrincipalOnlyCheckbox" name="PrincipalOnlyCheckbox" onChange={TransfersReactModule.handlePrincipalOnlyCheckboxChange} aria-label="principal only" tabIndex="0" />&nbsp;{TransfersReactObject.Settings.Literals.principalOnlyText}
                            </div>
                        </div>
                    </div>

                    {/* IRA CONTRIBUTION YEAR */}
                    <div id="IraContributionYearDiv" style={{ display: "none" }}>
                        <div className="form-container">
                            <div className="sub-div div-1">
                                <span className="form-label">{TransfersReactObject.Settings.Literals.contributionYearText}</span>
                            </div>

                            <div className="sub-div div-2">
                                {TransfersReactModule.calculateIraYearContributionsSelect()}
                            </div>
                        </div>
                    </div>

                    {TransfersReactModule.scheduledTransfers()}

                    <hr />

                    <div className="form-container">
                        <div className="sub-div div-1"></div>

                        <div className="sub-div div-2">
                            <input type="hidden" id="TransferModeHidden" name="TransferModeHidden" value="add" />
                            <input type="hidden" id="TransferPayeeNameHidden" name="TransferPayeeNameHidden" value={this.state.payeeName} />
                            <input type="hidden" id="TransferPayeeIdHidden" name="TransferPayeeIdHidden" value={this.state.payeeId} />
                            <input type="hidden" id="TransferPayeeConsumerIdHidden" name="TransferPayeeConsumerIdHidden" value={this.state.payeeConsumerId} />

                            <input type="button" className="btn btn-primary" value="Submit" id="AddPaymentSubmitButton" onClick={() => TransfersReactModule.validateScheduledTransferForm(false)}
                                onKeyUp={(e) => TransfersReactModule.validateScheduledTransferFormFromKeyPress(e)} tabIndex="0"
                                aria-label="Transfer Button. Clicking this button will open a modal. Use your screen readers' read modal keys to read the modal. For NVDA, it is your NVDA button plus the space key." />
                            <input type="button" id="TransferModuleClearFormButton" className="btn btn-default" value="Clear" onClick={() => TransfersReactModule.resetTransfersForm()} tabIndex="0"
                                onKeyUp={(e) => TransfersReactModule.resetTransfersFormFromKeyPress(e)} />
                        </div>
                    </div>
                </form>

                <div>
                    <TransferConfirmationModal />
                </div>
            </div>
        )
    };
};




// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================




// TRANSFER CONFIRMATION MODAL:
class TransferConfirmationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        window.TransfersConfirmModalComponent = this;
        this.modalTarget = document.createElement('div');
        this.modalTarget.className = '';
        document.body.appendChild(this.modalTarget);
        this._render();
    }

    componentWillUpdate() {
        this._render();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.modalTarget);
        document.body.removeChild(this.modalTarget);
    }

    bringToFocus() {
        setTimeout(function () {
            document.getElementById("TransferConfirmationModalHiddenTitle").focus();
        }, 100);
    }

    _render() {
        ReactDOM.render(
            <div className="modal modal-lg fade" id="TransferConfirmationModal" role="dialog" aria-label="Confirm transfer modal.">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 id="TransferConfirmationModalHiddenTitle" className="offscreen-label" tabIndex="0" aria-label="model opened">model opened</h5>
                            <button type="button" id="ReactNativeConfirmTransferModalCloseButtonX" className="close" data-dismiss="modal"
                                aria-label="Close Button" tabIndex="2"
                                onClick={TransfersReactModule.handleConfirmModalClosed} ><span aria-hidden="true">&times;</span></button>
                            <h4 id="ReactNativeConfirmTransferModalH4Heading" className="modal-title" tabIndex="0">
                                {TransfersReactObject.Settings.Literals.confirmTransferModalTitleText}
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="modal-print-area">
                                <div id="cashAdvanceWarningDiv" className="text-center" style={{ display: "none" }}>
                                    <div>{TransfersReactObject.Settings.Literals.cashAdvanceWarningTitleText}</div>
                                    <div id="cashAdvanceWarningMessageDiv" className="cash-advance-message">
                                        {/* Cash Advance Warning Message will be rendered here   */}
                                    </div>
                                    <input type="button" id="cashAdvanceWarningYesButton" className="btn btn-success cash-advance-button" value="Yes" tabIndex="0" />
                                    <input type="button" id="cashAdvanceWarningNoButton" className="btn btn-danger cash-advance-button" data-dismiss="modal" value="No" tabIndex="0" />
                                </div>

                                <div id="confirmTransferDescriptionDiv" aria-label="Transfer Description">
                                    {/* Transfer details will be rendered here */}
                                </div>

                                <dl id="dlScheduledTransferDetails" className="dl-horizontal">
                                    {/* Regular transfer description (if there is one) */}
                                    <dt id="dtTransferDescriptionConfirm">
                                        Transfer Description
									</dt>
                                    <dd id="descTransferDescription"></dd>

                                    {/*  Scheduled transfer details: */}
                                    <dt>
                                        Description
									</dt>
                                    <dd id="descScheduledTransferDescription"></dd>

                                    <dt>
                                        Frequency
									</dt>
                                    <dd id="descScheduledTransferFrequency"></dd>

                                    <dt>
                                        Beginning
									</dt>
                                    <dd id="descScheduledTransferBeginning"></dd>

                                    <dt>
                                        Ending
									</dt>
                                    <dd id="descScheduledTransferEnding"></dd>
                                </dl>

                                <div id="transferProgressDiv" className="spinner-container" style={{ display: "none" }}>
                                    <img src={TransfersReactObject.Settings.spinnerFilename} alt="Transferring…" />&nbsp;Transferring...
								</div>

                                <div id="transferSuccessDiv" className="alert alert-success" style={{ display: "none" }} tabIndex="0">
                                    {/* Success message will be rendered here */}
                                </div>

                                <div id="transferFailedDiv" className="alert alert-danger" style={{ display: "none" }} tabIndex="0">
                                    {/* Error message will be rendered here */}
                                </div>

                                <div id="transferCompletedDetailsDiv" className="transfer-completed-details" style={{ display: "none" }} tabIndex="0">
                                    {/* Transfer completed details will be rendered here */}
                                </div>

                                <div id="cashAdvanceInsufficientFundsWarningDiv" className="alert alert-danger" style={{ display: "none" }} tabIndex="0">
                                    {/* Insufficient funds details will be rendered here */}
                                </div>
                            </div>

                            <div id="confirmTransferModalFooter" className="modal-footer">
                                <input id="transferCancelButton" type="button" className="btn btn-danger pull-left" data-dismiss="modal" value="Cancel" tabIndex="3"
                                    onClick={TransfersReactModule.handleConfirmModalClosed} onKeyUp={(e) => TransfersReactModule.handleConfirmModalClosedFromKeyPress(e)} />
                                <input id="transferConfirmButton" type="button" className="btn btn-primary pull-right" value="Transfer" tabIndex="4"
                                    onClick={TransfersReactModule.submitTransferForm} onKeyUp={(e) => TransfersReactModule.submitTransferFormFromKeyPress(e)} />
                                <input id="transferPrintButton" type="button" className="btn btn-default pull-left" value="Print" style={{ display: "none" }}
                                    onClick={(e) => TransfersReactModule.printPage(e)} onKeyUp={(e) => TransfersReactModule.printPageFromKeyPress(e)} tabIndex="3" />
                                <input id="transferDismissButton" type="button" className="btn btn-primary pull-right" data-dismiss="modal" value="OK" tabIndex="4" aria-label="Ok button. click to close modal."
                                    onClick={TransfersReactModule.handleConfirmModalClosedWithPageReset} onKeyUp={(e) => TransfersReactModule.handleConfirmModalClosedWithPageResetFromKeyPress(e)} style={{ display: "none" }} />
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
    <TransfersArea />, document.getElementById('TransfersReactContainer')
);
