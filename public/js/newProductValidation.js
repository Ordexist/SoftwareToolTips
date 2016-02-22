/**
 * Created by Alec on 2/9/2016.
 *
 * Handles validating the New Product form
 */

$(function () {
    $("#lastUpdate").datepicker({
        maxDate: '0'
    });
});

$().ready(function() {
    $("#newProductForm").validate({
        rules: {
            productName: {
                required: true,
                minlength: 2
            },
            logoUrl: {
                url: true,
                imageUrl: true
            },
            versionNum: {
                required: true,
                versionNum: true
            },
            lastUpdate: {
                required: true,
                dateRange: {
                    dateBefore: function() {
                        var d = new Date();
                        var day = dateAddLeadingZero(d.getDate());
                        var month = dateAddLeadingZero(d.getMonth() + 1);
                        var year = d.getFullYear();

                        return year + '-' + month + '-' + day;
                    },
                    dateAfter: "1970-01-01"
                }
            }
        },
        messages: {
            productName: {
                required: "Please enter a product name",
                minlength: "The product name must be at least 2 characters"
            },
            versionNum: {
                required: "Please enter a version number",
                versionNum: "Please enter a valid version number. # - #.# - #.#.#"
            },
            lastUpdate: {
                required: "Please enter a valid date",
                dateRange: "Please enter a date between Jan 1, 1970 and today"
            }
        },
        submitHandler: function(form) {
            alert("submitted");
        }
    });
});

$.validator.addMethod( "imageUrl", function( value, element, param ) {
    param = typeof param === "string" ? param.replace( /,/g, "|" ) : "png|jpe?g|gif";
    return this.optional( element ) || value.match( new RegExp( "\\.(" + param + ")$", "i" ) );
}, $.validator.format( "Please enter a value with a valid extension." ) );

$.validator.addMethod("versionNum", function(value, element) {
    return this.optional( element ) || value.match( new RegExp( "^[0-9]*\.?[0-9]*\.?[0-9]+$" ));
}, $.validator.format( "Please enter a valid version number"));

$.validator.addMethod("dateRange", function(value, element, arg) {

    var dateBefore, dateAfter, dateEntered;

    if (arg.dateBefore) dateBefore = Date.parse(arg.dateBefore);
    else dateBefore = new Date();

    if (arg.dateAfter) dateAfter = Date.parse(arg.dateAfter);
    else dateAfter = Date.parse("1970-01-01");

    dateEntered = Date.parse(value);

    return this.optional(element) || ( (dateBefore >= dateEntered) && (dateAfter <= dateEntered) )

}, $.validator.format("Please specify a date between Jan 1, 1970 and today."));