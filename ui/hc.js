// Copyright (C) 2013-2017, The MetaCurrency Project (Eric Harris-Braun & Arthur Brock)
// Use of this source code is governed by GPLv3 found in the LICENSE file
//---------------------------------------------------------------------------------------

// Holochain UI library

// use send to make an ajax call to your exposed functions
function send(fn,data,resultFn) {
    if (VotingApp.debug) console.log("calling: " + fn+" with "+JSON.stringify(data));
    
    eval(VotingApp.getHook(fn, "preSendHook"));
    $.post(
        "/fn/sampleZome/"+fn,
        data,
        function(response) {
            if (VotingApp.debug) console.log("response: " + response);
            eval(VotingApp.getHook(fn, "successPreResult"));
            resultFn(response);
            eval(VotingApp.getHook(fn, "successPostResult"));
        }
    ).error(function(response) {
        console.log("response failed: " + response.responseText);
        $(".error").html("<span>" + response.responseText + "<span>").toggleClass("show", true)
        setTimeout
        ( () =>
          { $(".error")  .toggleClass("show", false);
            eval(VotingApp.getHook(fn, "errorTimeoutComplete"));
          },
          2000
        );
    })
    ;
};