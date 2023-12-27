function start()
{
    document.getElementById("a1").style.display="block";
    document.getElementById("a0").style.display="none";
    document.getElementById("a0").remove();
    document.getElementById("a2").style.color='#44d8d8';
    document.getElementById("a2").style.fontSize="32px";
    document.getElementById("edit").style.display="none";
    document.getElementById("stat").style.display="none";
    document.getElementById("graph").style.display="none";
    document.getElementById("help").style.display="none";
    document.getElementById("about").style.display="none";
}
function l(){
    document.getElementById("a0").style.display="block";
    document.getElementById("a1").style.display="none";
}

function changeColor(element) {
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
       links[i].style.color = "rgb(255, 255, 255)";
       links[i].style.fontSize="25px";
    }
    element.style.color = '#44d8d8';
    element.style.fontSize="32px";
}

//табличка
function handleFileUpload() {
    var fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var contents = e.target.result;
        displayDownloadedData(contents);
      };
      reader.readAsText(file);
    }
}

function displayDownloadedData(data) {
    var table = document.getElementById("downloadTable");
    table.innerHTML = "";
    var rows = data.split("\n");
    for (var i = 0; i < rows.length-1; i++) {
      var rowData = rows[i].split(";");
      var row = table.insertRow(-1);
      for (var j = 0; j < rowData.length; j++) {
        var cell = row.insertCell(-1);
        cell.innerHTML = rowData[j];
      }
    }
}

function hidetable(){
    document.getElementById('downloadTable').style.display = 'none';
}
  
function showtable(){
    document.getElementById('downloadTable').style.display = 'block';
}

function addTableData() {
    var table = document.getElementById("downloadTable");
    var row = table.insertRow();
    for (var i = 0; i < table.rows[0].cells.length; i++) {
       var cell = row.insertCell();
       cell.textContent = " ";
    } 
}

var button = document.getElementById('del');
var isButtonPressed = false;
button.addEventListener('mousedown', function() {
 if (!isButtonPressed) {
    deleter();
    isButtonPressed = true;
 }
});
button.addEventListener('mouseup', function() {
 if (isButtonPressed) {
  
    isButtonPressed = false;
 }
});
function deleter(){
  document.querySelector("#downloadTable").addEventListener('click', function tt(e) {
    if (e.target && e.target.nodeName == "TD") {
      var result = confirm("Вы уверены,что хотите удалить этого ученика?");
      if (result) {
        e.target.parentElement.remove();
        document.querySelector("#downloadTable").removeEventListener('click',tt);
      }
    }
  });
}

var table3 = document.getElementById('downloadTable');
table3.addEventListener('click', function(event) {
    var cell3 = event.target.closest('td');
    if (cell3) {
        var input3 = document.createElement('input');
        input3.type = 'text';
        input3.value = cell3.innerHTML;
        cell3.innerHTML = '';
        cell3.appendChild(input3);
        input3.focus();
        input3.select();
        input3.onblur = function() {
            var newText = this.value;
            cell3.textContent = newText;
        }
    }
});

function downloadCSV() {
  const table = document.getElementById('downloadTable');
  const csv = [];
    for (let i = 0; i < table.rows.length; i++) {
      const row = table.rows[i];
      const cols = [];

      for (let j = 0; j < row.cells.length; j++) {
        const cell = row.cells[j];
        const content = cell.textContent;
        if (content !== '') {
          cols.push(content);
        }
      }

      if (cols.length > 0) {
        csv.push(cols.join(';'));
      }
    }

  const csvText = csv.join('');
  const csvData = new Blob([csvText], { type: 'text/csv' });
  const csvURL = URL.createObjectURL(csvData);
  const downloadLink = document.createElement('a');

  downloadLink.href = csvURL;
  downloadLink.setAttribute('download', 'download.csv');
  downloadLink.click();
}

//матеша
function average(k) {
    var table = document.getElementById("downloadTable");
    var sum = 0;
    var count = 0;
    var t = document.getElementById("deti").value;
   
    for (var i = 1; i < table.rows.length; i++) {
       var row = table.rows[i];
       var cell = row.cells[k]; 
       if ((cell && !isNaN(parseInt(cell.innerText)))) { 
        if ((table.rows[i].cells[1].textContent == t)||(t=="")){
         sum += parseInt(table.rows[i].cells[k].innerText);
         count++;
       }
    }
  }
    var average = sum / count;
    return average;
}
  
function sred(){
    var table = document.getElementById('downloadTable');
    var stat = document.getElementById('stat3');
    for (var i = 1; i < stat.rows[0].cells.length; i++) {
      stat.rows[1].cells[i].textContent = average(i+1).toFixed(2).toString();
    }
}

function getMedianst(v) {
    var table = document.getElementById("downloadTable");
    var rows = table.getElementsByTagName("tr");
    var t = document.getElementById("deti").value;
    var numbers = [];
   
    for (var i = 1; i < rows.length; i++) {
       var cell = rows[i].getElementsByTagName('td')[v];
       if (cell) {
        if ((table.rows[i].cells[1].textContent == t)||(t=="")){
         numbers.push(parseInt(cell.innerHTML));
       }
    }
  }
    numbers.sort(function(a, b) {
       return a - b;
    });
   
    var medianIndex = Math.floor(numbers.length / 2);
   
    if (numbers.length % 2 === 0) {
       return (numbers[medianIndex - 1] + numbers[medianIndex]) / 2;
    } else {
       return numbers[medianIndex];
    }
}
   
function med(){
    var table = document.getElementById('downloadTable');
    var stat = document.getElementById('stat3');
   
    for (var i = 1; i < stat.rows[0].cells.length; i++) {
       var median = getMedianst(i+1);
       stat.rows[2].cells[i].textContent = median.toFixed(2).toString();
    }
}

function countObjects(searchValue, nomer) {
    let table = document.getElementById("downloadTable");
    let rows = table.getElementsByTagName('tr');
    var t = document.getElementById("deti").value;
    let count = 0;
    let c=0;
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
            if (cells[nomer].innerHTML == searchValue) {
              if ((table.rows[i].cells[1].textContent == t)||(t=="")){
                count++;
            }}
        if (count > 0){
          c++;
          count=0;
        }
    }
    return c;
  }
  
function alldata(){
    let table = document.getElementById("downloadTable");
    var t = document.getElementById("deti").value;
    var count = 0;
    for (var i = 1; i < table.rows.length; i++){
      if ((table.rows[i].cells[1].textContent == t)||(t=="")){
        count++;
    }
  }
  return count;
}
  
function kolvo(){
    var t = document.getElementById("deti").value;
    let table = document.getElementById("stat4");
    let table2 = document.getElementById("downloadTable");
    var rows = table.getElementsByTagName("tr");
    
    for (let i = 1; i < rows.length; i++) {
    for (var j = 1; j < table.rows[0].cells.length; j++) {
       rows[i].cells[j].textContent = countObjects(6-i,j+1).toString()+"шт"+"-"+(((countObjects(6-i,j+1)))/(alldata())*100).toFixed(2).toString()+"%";
    }
   }
}

//Grafik
function vibortablica(){
    for (var i = 0; i < 4; i++){
      var t = document.getElementById("diagramma").getElementsByTagName("input")[i];
      var checkedValue = t.checked ? t.value : '';
  if((checkedValue == "dsred")) {
    return "stat3";
  }
  if (checkedValue == "dmed")
    return "stat3";
    if (checkedValue == "dkolvo")
    return "stat4";
    if (checkedValue == "dprocent")
    return "stat4";
  }
}
  
function viborstroka(){
    for (var i = 0; i < 4; i++){
      var t = document.getElementById("diagramma").getElementsByTagName("input")[i];
      var checkedValue = t.checked ? t.value : '';
  if(checkedValue == "dsred") {
    return 1;
  }
    if (checkedValue == "dmed") 
    return 2;
    if (checkedValue == "dkolvo")
    return 3;
    if (checkedValue == "dprocent")
    return 4;
  }
}

function getTextFromCell(cell, startPosition) {
    var cellText = cell.textContent || cell.innerText;
    return cellText.substring(startPosition);
}

function drawChart() {
    var options = {
       backgroundColor: 'transparent', 
       width: 1000,
       height: 1000,
       legend: { position: 'none' },
       bar: {groupWidth: '85%'},
       colors:['#b6222f'],
       FontFace:"StampatelloFaceto",
       hAxis: {
        textStyle: {
          fontName: "StampatelloFaceto",
          color:'#d84451',
        }
     },
     vAxis: {
        textStyle: {
          fontName: "StampatelloFaceto",
          color:'#d84451',
        }
     },
     
    };
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Ученик');
      data.addColumn('number', '');
   
      var table = document.getElementById(vibortablica());
      var numRows = table.rows.length;
      var i = viborstroka();
      if (vibortablica()== "stat3"){
       for (var j = 1; j < table.rows[0].cells.length; j++){
        var category = table.rows[0].cells[j].innerText;
        var value = parseFloat(table.rows[i].cells[j].innerText);
        data.addRow([category, value]);
       }
       var chart = new google.visualization.BarChart(document.getElementById('chart_div')); 
    }
    else{
       for (var l = 1; l < table.rows.length; l++){
         for (var j = 1; j < table.rows[0].cells.length; j++){
           var category = table.rows[0].cells[j].innerText+" "+(6-l);
           if (i == 3){
           var value = parseFloat(table.rows[l].cells[j].innerText);
           }
           if (i == 4)
           var value = parseFloat(table.rows[l].cells[j].innerText.substring(table.rows[l].cells[j].innerText.indexOf("-",3)+1));
           data.addRow([category, value]);
       }
    }
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    }
   
      chart.draw(data,options);
}

function svazat(){
        let table = document.getElementById("deti");
        let table2 = document.getElementById("deti2");
          table.value = table2.value;
          kolvo(); sred(); med();
}