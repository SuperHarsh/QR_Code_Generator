$(document).ready(function () {
    const generateQRCode = () => {
        const inputType = $('#inputType').val();
        let inputValue = $('#inputValue').val();
        const qrCodeSize = parseInt($('#qrCodeSize').val());
        const qrCodeBgColor = $('#qrCodeBgColor').val();
        const qrCodeFgColor = $('#qrCodeFgColor').val();

        switch (inputType) {
            case 'location':
                const lat = $('#inputLat').val();
                const lng = $('#inputLng').val();
                inputValue = `geo:${lat},${lng}`;
                break;
            case 'wifi':
                const ssid = $('#inputSSID').val();
                const password = $('#inputPassword').val();
                const encryption = $('#inputEncryption').val();
                inputValue = `WIFI:S:${ssid};T:${encryption};P:${password};;`;
                break;
        }

        $('#qrcode').empty();
        const qrcode = new QRCode(document.getElementById("qrcode"), {
            text: inputValue,
            width: qrCodeSize,
            height: qrCodeSize,
            colorDark: qrCodeFgColor,
            colorLight: qrCodeBgColor,
        });
    };

    const updateInputFields = () => {
        const inputType = $('#inputType').val();
        let inputFieldsHtml = '';

        switch (inputType) {
            case 'url':
                inputFieldsHtml = '<input type="text" id="inputValue" class="form-control" placeholder="Enter URL">';
                break;
            case 'text':
                inputFieldsHtml = '<input type="text" id="inputValue" class="form-control" placeholder="Enter Text">';
                break;
            case 'tel':
                inputFieldsHtml = '<input type="text" id="inputValue" class="form-control" placeholder="Enter Phone Number">';
                break;
            case 'email':
                inputFieldsHtml = '<input type="text" id="inputValue" class="form-control" placeholder="Enter Email">';
                break;
            case 'address':
                inputFieldsHtml = '<input type="text" id="inputValue" class="form-control" placeholder="Enter Address">';
                break;
            case 'location':
                inputFieldsHtml = `
                    <input type="text" id="inputLat" class="form-control mb-2" placeholder="Enter Latitude">
                    <input type="text" id="inputLng" class="form-control" placeholder="Enter Longitude">
                `;
                break;
            case 'wifi':
                inputFieldsHtml = `
                    <input type="text" id="inputSSID" class="form-control mb-2" placeholder="Enter SSID">
                    <input type="text" id="inputPassword" class="form-control mb-2" placeholder="Enter Password">
                    <select id="inputEncryption" class="form-control">
                        <option value="WPA">WPA</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">No Password</option>
                    </select>
                `;
                break;
        }

        $('#inputFields').html(inputFieldsHtml);
    };

    $('#inputType').change(updateInputFields);
    $('#generateButton').click(generateQRCode);

    $('#downloadButton').click(() => {
        const canvas = $('#qrcode').find('canvas').get(0);
        canvas.toBlob((blob) => {
            saveAs(blob, 'qrcode.png');
        });
    });

    updateInputFields();
});



