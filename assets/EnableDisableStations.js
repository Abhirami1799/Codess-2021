function stationsCheck(elem)
{
    /*var id = elem.id;//$('a[aria-expanded="true"]').data("algo")
    if((id == 'multistop_algo' && $('a[aria-expanded="true"]').data("algo") !== 'multiStop') ||
        (id == 'travelsales_algo' && $('a[aria-expanded="true"]').data("algo") !== 'travelSales'))
    {
        document.getElementById('station_setter').removeAttribute("disabled");
    }
    else
    {
        document.getElementById('station_setter').setAttribute("disabled","true");
    }*/
}

function ShowHideDiv(weightedAlgo) {
    var dvPassport = document.getElementById("dvPassport");
    dvPassport.style.display = weightedAlgo.checked ? "block" : "none";
}

function ShowHideDiv2(intermediateNodes) {
    if(intermediateNodes.checked)
    {
        document.getElementById('station_setter').removeAttribute("disabled");
    }

    else
    {
        document.getElementById('station_setter').setAttribute("disabled","true");
        states.Context.ActiveGrid.actionMode = states.TOOL_MODE['START_NODE'];
    }
    //var dvPassport2 = document.getElementById("station_setter");
    //dvPassport2.style.display = intermediateNodes.checked ? "block" : "none";
}
