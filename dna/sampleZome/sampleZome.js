'use strict';

/* Anchors API */ function postCallProcess(rtn){return JSON.parse(rtn)}function setAnchor(anchor,value,entryType,preserveOldValueEntry){var parms={anchor:anchor,value:value};if(entryType!==undefined)parms.entryType=entryType;if(preserveOldValueEntry!==undefined)parms.preserveOldValueEntry=preserveOldValueEntry;return postCallProcess(call("anchors","set",parms))}function getAnchor(anchor,index,anchorHash){var parms={anchor:anchor};if(index!==undefined)parms.index=index;if(anchorHash!==undefined)parms.anchorHash=anchorHash;return postCallProcess(call("anchors","get",parms))}function addToListAnchor(anchor,value,entryType,index,preserveOldValueEntry){var parms={anchor:anchor,value:value};if(entryType!==undefined)parms.entryType=entryType;if(index!==undefined)parms.index=index;if(preserveOldValueEntry!==undefined)parms.preserveOldValueEntry=preserveOldValueEntry;return postCallProcess(call("anchors","addToList",parms))}function getFromListAnchor(anchor,index,anchorHash){var parms={anchor:anchor};if(index!==undefined)parms.index=index;if(anchorHash!==undefined)parms.anchorHash=anchorHash;return postCallProcess(call("anchors","getFromList",parms))}function removeFromListAnchor(anchor,value,entryType,index,preserveOldValueEntry,anchorHash,valueHash){var parms={anchor:anchor};if(value!==undefined)parms.value=value;if(entryType!==undefined)parms.entryType=entryType;if(index!==undefined)parms.index=index;if(preserveOldValueEntry!==undefined)parms.preserveOldValueEntry=preserveOldValueEntry;if(anchorHash!==undefined)parms.anchorHash=anchorHash;if(valueHash!==undefined)parms.valueHash=valueHash;return postCallProcess(call("anchors","removeFromList",parms))}function makeAnchorHash(value,entryType){var parms={value:value};if(entryType!==undefined)parms.entryType=entryType;return postCallProcess(call("anchors","makeAnchorHash",parms))}

// -----------------------------------------------------------------
//  This stub Zome code file was auto-generated
// -----------------------------------------------------------------

/**
 * Called only when your source chain is generated
 * @return {boolean} success
 */
function genesis() {
  // any genesis code here
  return true;
}

// -----------------------------------------------------------------
//  validation functions for every DHT entry change
// -----------------------------------------------------------------

/**
 * Called to validate any changes to the DHT
 * @param {string} entryName - the name of entry being modified
 * @param {*} entry - the entry data to be set
 * @param {?} header - ?
 * @param {?} pkg - ?
 * @param {?} sources - ?
 * @return {boolean} is valid?
 */
function validateCommit (entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case "sampleEntry":
      // validation code here
      return true;
    case "post":
      return true;
    default:
      // invalid entry name!!
      return true;
  }
}

/**
 * Called to validate any changes to the DHT
 * @param {string} entryName - the name of entry being modified
 * @param {*}entry - the entry data to be set
 * @param {?} header - ?
 * @param {?} pkg - ?
 * @param {?} sources - ?
 * @return {boolean} is valid?
 */
function validatePut (entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case "sampleEntry":
      // validation code here
      return true;
default:
      // invalid entry name!!
      return true;
  }
}

/**
 * Called to validate any changes to the DHT
 * @param {string} entryName - the name of entry being modified
 * @param {*} entry- the entry data to be set
 * @param {?} header - ?
 * @param {*} replaces - the old entry data
 * @param {?} pkg - ?
 * @param {?} sources - ?
 * @return {boolean} is valid?
 */
function validateMod (entryName, entry, header, replaces, pkg, sources) {
  switch (entryName) {
    case "sampleEntry":
      // validation code here
      return false;
    default:
      // invalid entry name!!
      return false;
  }
}

/**
 * Called to validate any changes to the DHT
 * @param {string} entryName - the name of entry being modified
 * @param {string} hash - the hash of the entry to remove
 * @param {?} pkg - ?
 * @param {?} sources - ?
 * @return {boolean} is valid?
 */
function validateDel (entryName,hash, pkg, sources) {
  switch (entryName) {
    case "sampleEntry":
      // validation code here
return false;
    default:
      // invalid entry name!!
      return false;
  }
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validatePutPkg (entryName) {
  return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateModPkg (entryName) {
  return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateDelPkg (entryName) {
  return null;
}




function sampleEntryCreate()
{
  return  App.Key.Hash;
}

function getMe()
{
  return App.Key.Hash;
}

function getProperty(name) 
{
  if (name == "App_DNA_Hash") {return App.DNA.Hash;}
}

function post(post) 
{
  var key = commit("post", post);          // Commits the post entry to my source chain
  var me = getMe();               

  // On the DHT, puts a link on my hash to the new post
  // commit("",{Links:[{Base:me,Link:key,Tag:"post"}]});
  return key;                            // Returns the hash of the new post to the caller
}

function getEntryFromDHT(hash)
{
  var retrieved = get(hash);
  debug(retrieved);
  return retrieved;
}

function setHandle(handle)
{
  // get old handle (if any)
  var oldHandle = getAnchor(getMe() + ":handle");

  if (oldHandle != null)
    removeFromListAnchor("userDirectory", undefined, undefined, oldHandle);
  
  // set handle
  setAnchor(getMe() + ":handle", handle);

  // Add the new handle to the directory
  addToListAnchor("userDirectory", getMe(), undefined, handle);

  var anchorHash = makeAnchorHash(handle);
  debug(anchorHash);

  return anchorHash;
  // var key = commit("handle", handle);
  // var me = getMe();

  // debug(key);

  // return key;
}


//Returns the handle of this node
function getMyHandle()
{
  var me = getMe();
  return getHandle(me);
}

// returns the handle of an agent
function getHandle(userHash) 
{
  var anchor = getAnchor(userHash + ":handle");
  debug(anchor);
  return anchor;
}

function getHandles()
{
  var rtn = getFromListAnchor("userDirectory");
  debug(rtn);
  debug(rtn[0]);

  handles = [];

  for (var i = 0; i < rtn.length; i++)
    handles.push({handle: rtn[i].index, hash: rtn[i].value});
  
  return handles;
}