var gFiles = 0;
var no = 1;
var getGst = null;
var getGstType = null;
var getGstAmount = null;
var getAmount = null;
var gst = null;
var gst_type = null;
var gst_amount = null;
var amount = null;
var count = 0;
var currentAmount = 0;
var currentCount = 0;
var currentEarly = 0;
var rateId = null;
var getCondArray = null;
var getAmountArray = null;
var getCondLegth = null;
var getEarly = null;
var tempAmount = 0;
var lastAmount = 0;
var lastGst = 0;
var lastTotal = 0;

    function addFile() {
        var tr = document.createElement('tr');
        tr.setAttribute('id', 'file-' + gFiles);
        var td = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        td.innerHTML = "<input type='text' name='data[Participant][name][]'/>";
        td2.innerHTML = "<input type='text' name='data[Participant][designation][]'/>";
        td3.innerHTML = "<span onclick='addFile()' style='cursor:pointer;'><img style='width:22px; height:22px;' src='images/plus.svg'></span>&nbsp;<span onclick='removeFile(\"file-" + gFiles + "\")' style='cursor:pointer;'><img style='width:22px; height:22px;' src='images/minus.svg'></span>";
        tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
        document.getElementById('files-root').appendChild(tr);
        gFiles++;
        no ++;
        amountAdd(no)
    }
    function removeFile(aId) {
        var obj = document.getElementById(aId);
        obj.parentNode.removeChild(obj);
        no --;
        removeAmount(no)
    }

    function amountAdd(no){
		selectFirstAmount();
        for(i=0; i < getCondLegth.length; i++){
            if(no == getCondLegth[i].value){
                currentAmount = getAmountArray[i].value;
                currentCount = getCondLegth[i].value;
                currentEarly = getEarly[i].value;
                currentDuration = getDuration[i].value;
				gst = getGst[i].value;
				gst_type = getGstType[i].value;
				gst_amount = getGstAmount[i].value;
				amount = getAmount[i].value;
				if(gst_type == 'zero-rate'){
					var lastAmount = currentAmount*no;
					var lastGst = 0;
					var lastTotal = lastAmount;
					document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
				document.getElementById('amount').value = lastAmount.toFixed(2);
				document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
				document.getElementById('gst').value = lastGst.toFixed(2);
				document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
				document.getElementById('totalAmount').value = lastTotal.toFixed(2);
				}else{
					var lastAmount = currentAmount*no;
					var lastGst = gst_amount*no;
					var lastTotal = lastAmount+lastGst;
					document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
				document.getElementById('amount').value = lastAmount.toFixed(2);
				document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
				document.getElementById('gst').value = lastGst.toFixed(2);
				document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
				document.getElementById('totalAmount').value = lastTotal.toFixed(2);
				}
                count = i;

                break;
            }
        }

        var eventStart = document.getElementById("eventStart").value;
        var dateNow = document.getElementById("dateNow").value;
        var discount = currentEarly;

        // function to set date
        Date.prototype.addDays = function(days)
        {
            var dat = new Date(this.valueOf())
            dat.setDate(dat.getDate()+days);
            return dat;
        }
        var newDuration = Number(currentDuration);
        var dat = new Date(eventStart);
        var dated = dat.addDays(newDuration);

        var earlyAfter = dated.getFullYear().toString() + "-" +
            (dated.getMonth()+1 < 10 ? "0" + (dated.getMonth()+1).toString() : (dated.getMonth()+1).toString()) + "-" +
            (dated.getDate() < 10 ? "0" + dated.getDate().toString() : dated.getDate().toString());
        // end function to set date
        document.getElementById('announce').style.visibility = "hidden";

        if(dateNow >= eventStart && dateNow < earlyAfter && discount != 0 && currentDuration != 0)
        {
            if(gst_type == 'zero-rate'){
				tempAmount = currentAmount*no;
				lastAmount = (tempAmount-(tempAmount*(discount/100)));
				lastGst = 0;
				lastTotal = lastAmount;
				document.getElementById('dummy').innerHTML = +lastAmount.toFixed(2);
        document.getElementById('amount').value = lastAmount.toFixed(2);
		document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
		document.getElementById('gst').value = lastGst.toFixed(2);
		document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
		document.getElementById('totalAmount').value = lastTotal.toFixed(2);
			}else{
				tempAmount = currentAmount*no;
				lastAmount = (tempAmount-(tempAmount*(discount/100)));
				lastGst = (gst_amount-(gst_amount*(discount/100)))*no;
				lastTotal = lastAmount+lastGst;
				document.getElementById('dummy').innerHTML = +lastAmount.toFixed(2);
        document.getElementById('amount').value = lastAmount.toFixed(2);
		document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
		document.getElementById('gst').value = lastGst.toFixed(2);
		document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
		document.getElementById('totalAmount').value = lastTotal.toFixed(2);
			}
            document.getElementById('announce').style.visibility = "visible";
            var d1=new Date(earlyAfter);
            document.getElementById('dateEarlyAfter').innerHTML = (dated.getDate() < 10 ? "0" + dated.getDate().toString() : dated.getDate().toString()) + "-" +
                (dated.getMonth()+1 < 10 ? "0" + (dated.getMonth()+1).toString() : (dated.getMonth()+1).toString()) + "-" +
                dated.getFullYear().toString();
            document.getElementById('dateEarly').innerHTML = currentEarly+'%';
        }

    }

    function removeAmount(no){
		selectFirstAmount()
        for(i=0; i < getCondLegth.length; i++){
            if(no == getCondLegth[i].value){
                currentAmount = getAmountArray[i].value;
                currentCount = getCondLegth[i].value;
                currentEarly = getEarly[i].value;
                currentDuration = getDuration[i].value;

				gst = getGst[i].value;
				gst_type = getGstType[i].value;
				gst_amount = getGstAmount[i].value;
				amount = getAmount[i].value;

				if(gst_type == 'zero-rate'){
					var lastAmount = currentAmount*no;
					var lastGst = 0;
					var lastTotal = lastAmount;
					document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
				document.getElementById('amount').value = lastAmount.toFixed(2);
				document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
				document.getElementById('gst').value = lastGst.toFixed(2);
				document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
				document.getElementById('totalAmount').value = lastTotal.toFixed(2);
				}else{
					var lastAmount = currentAmount*no;
					var lastGst = gst_amount*no;
					var lastTotal = lastAmount+lastGst;
					document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
				document.getElementById('amount').value = lastAmount.toFixed(2);
				document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
				document.getElementById('gst').value = lastGst.toFixed(2);
				document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
				document.getElementById('totalAmount').value = lastTotal.toFixed(2);
				}
					break;
				}
			}
        if(no < currentCount){
            count --;
			if(count < 0){
				count = 0;
			}
            currentAmount = getAmountArray[count].value;
            currentEarly = getEarly[count].value;
            currentDuration = getDuration[count].value;

			gst = getGst[count].value;
			gst_type = getGstType[count].value;
			gst_amount = getGstAmount[count].value;
			amount = getAmount[count].value;

			if(gst_type == 'zero-rate'){
				var lastAmount = amount*no;
				var lastGst = 0;
				var lastTotal = lastAmount;
				document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
				document.getElementById('amount').value = lastAmount.toFixed(2);
				document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
				document.getElementById('gst').value = lastGst.toFixed(2);
				document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
				document.getElementById('totalAmount').value = lastTotal.toFixed(2);
			}else{
				var lastAmount = amount*no;
				var lastGst = gst_amount*no;
				var lastTotal = lastAmount+lastGst;
				document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
				document.getElementById('amount').value = lastAmount.toFixed(2);
				document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
				document.getElementById('gst').value = lastGst.toFixed(2);
				document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
				document.getElementById('totalAmount').value = lastTotal.toFixed(2);
			}
        }

        var eventStart = document.getElementById("eventStart").value;
        var dateNow = document.getElementById("dateNow").value;
        var discount = currentEarly;

        // function to set date
        Date.prototype.addDays = function(days)
        {
            var dat = new Date(this.valueOf())
            dat.setDate(dat.getDate()+days);
            return dat;
        }
        var newDuration = Number(currentDuration);
        var dat = new Date(eventStart);
        var dated = dat.addDays(newDuration);

        var earlyAfter = dated.getFullYear().toString() + "-" +
            (dated.getMonth()+1 < 10 ? "0" + (dated.getMonth()+1).toString() : (dated.getMonth()+1).toString()) + "-" +
            (dated.getDate() < 10 ? "0" + dated.getDate().toString() : dated.getDate().toString());
        // end function to set date
        document.getElementById('announce').style.visibility = "hidden";
        if(dateNow >= eventStart && dateNow < earlyAfter && discount != 0 && currentDuration != 0)
        {
            if(gst_type == 'zero-rate'){
				var tempAmount = currentAmount*no;
				var lastAmount = (tempAmount-(tempAmount*(discount/100)));
				var lastGst = 0;
				var lastTotal = lastAmount;
				document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
				document.getElementById('amount').value = lastAmount.toFixed(2);
				document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
				document.getElementById('gst').value = lastGst.toFixed(2);
				document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
				document.getElementById('totalAmount').value = lastTotal.toFixed(2);
			}else{
				var tempAmount = currentAmount*no;
				var lastAmount = (tempAmount-(tempAmount*(discount/100)));
				var lastGst = (gst_amount-(gst_amount*(discount/100)))*no;
				var lastTotal = lastAmount+lastGst;
				document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
				document.getElementById('amount').value = lastAmount.toFixed(2);
				document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
				document.getElementById('gst').value = lastGst.toFixed(2);
				document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
				document.getElementById('totalAmount').value = lastTotal.toFixed(2);
			}
            document.getElementById('announce').style.visibility = "visible";
            var d1=new Date(earlyAfter);
            document.getElementById('dateEarlyAfter').innerHTML = (dated.getDate() < 10 ? "0" + dated.getDate().toString() : dated.getDate().toString()) + "-" +
                (dated.getMonth()+1 < 10 ? "0" + (dated.getMonth()+1).toString() : (dated.getMonth()+1).toString()) + "-" +
                dated.getFullYear().toString();
            document.getElementById('dateEarly').innerHTML = currentEarly+'%';
        }
    }

    function validate() {
        var name = document.getElementsByName('data[Participant][name][]');
        var designation = document.getElementsByName('data[Participant][designation][]');
        var total="";
        var total2="";
        var registerOrganization = document.getElementById('RegisterOrganization').value;
        var registerContactPerson = document.getElementById('RegisterContactPerson').value;
        var registerEmail = document.getElementById('RegisterEmail').value;
        var radio = document.getElementsByName('data[Register][payment_mode]');

        for(var i=0; i < name.length; i++){
            total = name[i].value;
            total2 = designation[i].value;
        }

        if(total == "" || total2 == ""){
            alert("Please insert Participant field.");
            return false;
        }
        if(registerOrganization == ''){
            alert('Please fill the Organization field.');
            return false;
        }
        if(registerContactPerson == ''){
            alert('Please fill the Contact person field.');
            return false;
        }else{
            if(isNaN(registerContactPerson)){
                alert ("Please enter a valid phone number for Contact person");
                return false;
            }
        }

        if(registerEmail == ''){
            alert('Please fill the Email field.');
            return false;
        }else{
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var address = registerEmail;
            if(reg.test(address) == false) {
                alert('Invalid Email Address');
                return false;
            }
        }

		if ($('#RegisterPaymentModeMigs').is(':checked') && $('#address').val() == '') { alert('Please Enter Billing Address.'); return false; }
		if (($('#bank_code').val() == '') && ($('#fpx').is(':checked'))) { $('#bank_code').focus(); alert('Please Select The Bank.'); return false;}
	return true;

        var myOption = -1;
        for (i=radio.length-1; i > -1; i--) {
            if (radio[i].checked) {
                myOption = i; i = -1;
            }
        }
        if (myOption == -1) {
            alert("You must select a via payment");
            return false;
        }



    }

    function selectFirstAmount(){
        rateId = document.getElementById('condValue').value;
        getCondArray = document.getElementById('val_'+rateId).value;
        getAmountArray = document.getElementsByName('data_'+rateId+'[]');
        getCondLegth = document.getElementsByName('val_'+rateId+'[]');
        getEarly = document.getElementsByName('early_'+rateId+'[]');
        getDuration = document.getElementsByName('duration_'+rateId+'[]');
		getGst = document.getElementsByName('gst_'+rateId+'[]');
		getGstType = document.getElementsByName('gst_type_'+rateId+'[]');
		getGstAmount = document.getElementsByName('gst_amount_'+rateId+'[]');
		getAmount = document.getElementsByName('total_'+rateId+'[]');

        for(i=0; i < getCondLegth.length; i++){
            if(no == getCondLegth[i].value){
                currentAmount = getAmountArray[i].value;
                currentCount = getCondLegth[i].value;
                currentEarly = getEarly[i].value;
                currentDuration = getDuration[i].value;

				gst = getGst[i].value;
				gst_type = getGstType[i].value;
				gst_amount = getGstAmount[i].value;
				amount = getAmount[i].value;

				var lastTotal = amount*no;
				var lastGst = gst_amount*no;
				if(gst_type == 'zero-rate'){
					var lastAmount = lastTotal;
					document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
        document.getElementById('amount').value = lastAmount.toFixed(2);
		document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
		document.getElementById('gst').value = lastGst.toFixed(2);
		document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
		document.getElementById('totalAmount').value = lastTotal.toFixed(2);
				}else{
					var lastAmount = lastTotal-lastGst;
					document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
        document.getElementById('amount').value = lastAmount.toFixed(2);
		document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
		document.getElementById('gst').value = lastGst.toFixed(2);
		document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
		document.getElementById('totalAmount').value = lastTotal.toFixed(2);
				}
                break;
            }else{
                currentAmount = getAmountArray[count].value;
                currentCount = getCondLegth[count].value;
                currentEarly = getEarly[count].value;
                currentDuration = getDuration[count].value;

				gst = getGst[count].value;
				gst_type = getGstType[count].value;
				gst_amount = getGstAmount[count].value;
				amount = getAmount[count].value;

				var lastTotal = amount*no;
				var lastGst = gst_amount*no;
				if(gst_type == 'zero-rate'){
					var lastAmount = lastTotal;
					document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
        document.getElementById('amount').value = lastAmount.toFixed(2);
		document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
		document.getElementById('gst').value = lastGst.toFixed(2);
		document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
		document.getElementById('totalAmount').value = lastTotal.toFixed(2);
				}else{
					var lastAmount = lastTotal-lastGst;
					document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
        document.getElementById('amount').value = lastAmount.toFixed(2);
		document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
		document.getElementById('gst').value = lastGst.toFixed(2);
		document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
		document.getElementById('totalAmount').value = lastTotal.toFixed(2);
				}

                break;
            }
        }

        var eventStart = document.getElementById("eventStart").value;
        var dateNow = document.getElementById("dateNow").value;
        var discount = currentEarly;

        // function to set date
        Date.prototype.addDays = function(days)
        {
            var dat = new Date(this.valueOf())
            dat.setDate(dat.getDate()+days);
            return dat;
        }
        var newDuration = Number(currentDuration);
        var dat = new Date(eventStart);
        var dated = dat.addDays(newDuration);

        var earlyAfter = dated.getFullYear().toString() + "-" +
            (dated.getMonth()+1 < 10 ? "0" + (dated.getMonth()+1).toString() : (dated.getMonth()+1).toString()) + "-" +
            (dated.getDate() < 10 ? "0" + dated.getDate().toString() : dated.getDate().toString());
        // end function to set date
        document.getElementById('announce').style.visibility = "hidden";
        if(dateNow >= eventStart && dateNow < earlyAfter && discount != 0 && currentDuration != 0)
        {

			if(gst_type == 'zero-rate'){
				var lastAmount = lastTotal-(lastTotal*(discount/100));
				var lastGst = 0;
				var lastTotal = lastAmount;
				document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
        document.getElementById('amount').value = lastAmount.toFixed(2);
		document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
		document.getElementById('gst').value = lastGst.toFixed(2);
		document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
		document.getElementById('totalAmount').value = lastTotal.toFixed(2);
			}else{
				var tempTotal = +lastTotal-lastGst;
				var lastAmount = +tempTotal-(tempTotal*(discount/100));

				var tempGst = +gst_amount*no;
				var lastGst = +tempGst-(tempGst*(discount/100));

				var lastTotal = lastAmount+lastGst;
				document.getElementById('dummy').innerHTML = lastAmount.toFixed(2);
        document.getElementById('amount').value = lastAmount.toFixed(2);
		document.getElementById('gstDummy').innerHTML = lastGst.toFixed(2);
		document.getElementById('gst').value = lastGst.toFixed(2);
		document.getElementById('totalDummy').innerHTML = lastTotal.toFixed(2);
		document.getElementById('totalAmount').value = lastTotal.toFixed(2);
			}

            document.getElementById('announce').style.visibility = "visible";
            var d1=new Date(earlyAfter);
            document.getElementById('dateEarlyAfter').innerHTML = (dated.getDate() < 10 ? "0" + dated.getDate().toString() : dated.getDate().toString()) + "-" +
                (dated.getMonth()+1 < 10 ? "0" + (dated.getMonth()+1).toString() : (dated.getMonth()+1).toString()) + "-" +
                dated.getFullYear().toString();
            document.getElementById('dateEarly').innerHTML = currentEarly+'%';
        }


    }
$(document).ready(function() {
	$('#RegisterBilling').hide();
	$('#bank_list').hide();
	$('#migs').click(function(){
		$('#RegisterBilling').show();
		$('#bank_list').hide();
	});
	if (($('#migs').attr('checked')) && (!$('#address').val())) { alert('Please Enter Billing Address.'); return false; }
	$('#fpx').click(function(){
		$('#RegisterBilling').hide();
		$('#address').val('');
		$('#bank_list').show();
	});
});
