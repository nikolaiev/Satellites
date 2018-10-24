/**
 * @return {string}
 */
function GetURLParameter(sParam) {
    let sPageURL = window.location.search.substring(1);
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++)
    {
        const sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam)
        {
            return sParameterName[1];
        }
    }
}

$( document ).ready(function() {
    let satlName = GetURLParameter('satlName');
    console.log( satlName );
});
let satlName = GetURLParameter('satlName');
//TODO retrive some information as DB logging

