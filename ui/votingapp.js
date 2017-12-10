console.log("I AM A CONSOLE LOG");
VotingApp = 
{ "debug": false,

  "functionSpecDict":
      { "appProperty":{"preSendHook":"VotingApp.noOp=true;","successPreResult":"VotingApp.noOp=true;","successPostResult":"VotingApp.noOp=true;"},
        "getPostsBy":{"preSendHook":"VotingApp.noOp=true;","successPreResult":"VotingApp.noOp=true;","successPostResult":"VotingApp.noOp=true;"},
        "newHandle":{"preSendHook":"$(\".spinner\").toggleClass(\"show\", true);","successPreResult":"VotingApp.noOp=true;","successPostResult":"$(\".spinner\").toggleClass(\"show\", false);"},
        "getAgent":{"preSendHook":"$(\".spinner\").toggleClass(\"show\", true);","successPreResult":"VotingApp.noOp=true;","successPostResult":"VotingApp.noOp=true;"},
        "follow":{"preSendHook":"$(\".spinner\").toggleClass(\"show\", true);","successPreResult":"VotingApp.noOp=true;","successPostResult":"$(\".spinner\").toggleClass(\"show\", false);"},
        "post":{"preSendHook":"$(\".logo > img\").toggleClass(\"spin\", true);","successPreResult":"VotingApp.noOp=true;","successPostResult":"$(\".logo > img\").toggleClass(\"spin\", false);"},
        "manual":{"clearUI":"$(\".spinner\").toggleClass(\"show\", false);","normalUI":"$(\".spinner\").toggleClass(\"show\", false);"},
        "getHandle":{"preSendHook":"$(\"#changeHandleButton\").toggleClass(\"colorCycle\", true);","successPreResult":"VotingApp.noOp=true;","successPostResult":"$(\"#changeHandleButton\").toggleClass(\"colorCycle\", false);"},
        "getFollow":{"preSendHook":"$('#followButton').toggleClass('colorCycle', true);","successPreResult":"VotingApp.noOp=true;","successPostResult":"$('#followButton').toggleClass('colorCycle', false);"},

      },
  "getHook": 
      (functionName, hookName) =>
      { if (!VotingApp.functionSpecDict.hasOwnProperty(functionName))
        { VotingApp.functionSpecDict[functionName]  = {};
        }
        if (!VotingApp.functionSpecDict[functionName].hasOwnProperty(hookName))
        { VotingApp.functionSpecDict[functionName][hookName] = "";
        }
        return VotingApp.functionSpecDict[functionName][hookName];
      },
};

function getMyHandle()
{
    send("getMyHandle", undefined, function(handle) {
        console.log(handle);
    })
}

$(window).ready(function() 
{
    getMyHandle();
})