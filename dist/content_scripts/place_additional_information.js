chrome.storage.sync.get({additionalInformation:""},function(o){var a=jQuery('form[name="additionalInformation"]').find("textarea");a.length>0?a.val(o.additionalInformation).select():console.log("A textarea field for additionalInformation is not visible. If you think it is visible and pasting of additionalInformation did not work, please report this as a bug to the developer at earvin.piamonte@gmail.com.")});