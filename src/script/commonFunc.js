var Buffer = require('buffer/').Buffer;
class CommonFunction {
    /**------------------------------------------
    * Show biểu tượng loading toàn màn hình
    * @created : quyetkaito (18/08/2022)
    --------------------------------------------*/
    load() {
        let loading = document.getElementById('loading-bg');
        if (loading) {
            loading.style.display = 'block';
        }
    }

    /**------------------------------------------
    *  Ẩn biểu tượng loading toàn màn hình
    * @created : quyetkaito (18/08/2022)
    --------------------------------------------*/
    unload() {
        let loading = document.getElementById('loading-bg');
        if (loading) {
            loading.style.display = 'none';
        }
    }

    /**---------------------------------
     * Hàm validate định dạng email
     * @param {String} email dạng chuỗi.
     * Author: quyetkaito (25/02/2022)
     -----------------------------------*/
    validateEmail(email) {
        let re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /**
     * Hàm chuyển string về dạng base64
     * @param {String} string 
     * @returns 
     * @created : quyetkaito 26/09/2022
     */
    convertToBase64(string) {
        try {
            if (!string) {
                return;
            }
            if (Buffer && typeof Buffer.from == "function") {
                const buff = Buffer.from(string);
                const base64 = buff.toString('base64');
                return base64;
            }

        } catch (error) {
            console.error(error)
        }
    }

    /**------------------------------------------
    * Hàm convert base64 về lại string
    * @created : quyetkaito (26/09/2022)
    * @param {String} base64String: chuỗi base64 cần giải mã
    --------------------------------------------*/
    decodeBase64(base64String) {
        try {
            if (Buffer && typeof Buffer.from == "function") {
                const buff = Buffer.from(base64String, 'base64');
                const str = buff.toString('utf-8');
                return str;
            }
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Hàm thực hiện so sánh chi tiết 2 đối tượng theo key-value
     * @created : quyetkaito
     * @param  {obj1} :đối tượng 1
     * @param {obj2}: đối tượng 2
     * @returns {true}: giống nhau, {false}: khác nhau
     */
    isDeepEqual(obj1, obj2) {
        if (!this.isObject(obj1) || !this.isObject(obj2)) return false;
        obj1 = JSON.parse(JSON.stringify(obj1));
        obj2 = JSON.parse(JSON.stringify(obj2));
        if (obj1 && obj2) {
            //so sánh từng key - value mới chuẩn
            let objKeys1 = Object.keys(obj1);
            let objKeys2 = Object.keys(obj2);
            if (objKeys1.length != objKeys2.length) return false; //nếu độ dài của 2 object khác nhau => khác nhau                
            for (let key of objKeys1) {
                let value1 = obj1[key];
                let value2 = obj2[key];
                const isObjects = this.isObject(value1) && this.isObject(value2);

                if ((isObjects && !this.isDeepEqual(value1, value2)) || (!isObjects && value1 !== value2)) return false;
            }

            return true;
        }
    }

    /**
     * hàm kiểm tra xem một biến có phải là object hay không.
     * @created : quyetkaito 12/10/2022
     */
    isObject(object) {
        return object != null && typeof object === "object";
    }

    /**
     * Hàm set lại timezone cho ngày tháng để fixbug bị lùi 1 ngày
     * @created : quyetkaito 12/10/2022
     */
    setTimeZone(date) {
        try {
            if (date) {
                var newDate = date;
                newDate.setTime(
                    newDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
                );
                return newDate.toISOString();
            } else {
                return "";
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Hàm validate định dạng ảnh
     * @created : quyetkaito 13/10/2022
     */
    validateInputImage(input) {
        try {
            var validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'jfif']; //danh sách các định dạng ảnh được chấp nhận
            var fileName = input.files[0].name; //lấy tên file
            var fileNameExt = fileName.substring(fileName.lastIndexOf('.') + 1); //lấy đuôi file
            //kiểm tra nếu đuôi file ko nằm trong mảng thì alert
            if (!validExtensions.includes(fileNameExt, validExtensions)) {
                alert("Vui lòng chọn file ảnh đúng định dạng(.jpg, .jpeg, .png, .gif, .jfif)");
                return false;
            } else {
                //kiểm tra kích thước file (nếu yếu cầu)
                // var size = (input.files[0].size / 1024 / 1024).toFixed(2);
                // if (size > 3) {
                //     alert("Vui lòng chọn ảnh có kích thước <3MB");
                //     return false;
                // }                
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Hàm format định dạng ngày tháng
     * @created : quyetkaito 15/10/2022
     */
    formatDate(date, format) {
        try {
            if (!date) {
                return "";
            }
            var newDate = new Date(date);
            var dateString = newDate.getDate();
            if (dateString < 10) {
                dateString = "0" + dateString;
            }
            var monthString = newDate.getMonth() + 1;
            if (monthString < 10) {
                monthString = "0" + monthString;
            }
            var yearString = newDate.getFullYear();
            if (format) {
                if (format === "DD/MM/YYYY") {
                    return `${dateString}/${monthString}/${yearString}`;
                }
                if (format === "MM/DD/YYYY") {
                    return `${monthString}/${dateString}/${yearString}`;
                }
                if (format === "YYYY/MM/DD") {
                    return `${yearString}/${monthString}/${dateString}`;
                }
            } else {
                return `${dateString}/${monthString}/${yearString}`;
            }
        } catch (error) {
            console.error(error);
        }
    }

    formatDateTime(date, format) {
        try {
            if (!date) {
                return "";
            }
            var newDate = new Date(date);
            var dateString = newDate.getDate();
            if (dateString < 10) {
                dateString = "0" + dateString;
            }
            var monthString = newDate.getMonth() + 1;
            if (monthString < 10) {
                monthString = "0" + monthString;
            }
            var yearString = newDate.getFullYear();
            var hourString = newDate.getHours();
            var minuteString = newDate.getMinutes();
            if (hourString.toString().length < 2) hourString = "0" + hourString;
            if (minuteString.toString().length < 2) minuteString = "0" + minuteString;
            if (format) {
                if (format === "DD/MM/YYYY") {
                    return `${dateString}/${monthString}/${yearString} - ${hourString}:${minuteString}`;
                }
                if (format === "MM/DD/YYYY") {
                    return `${monthString}/${dateString}/${yearString} - ${hourString}:${minuteString}`;
                }
                if (format === "YYYY/MM/DD") {
                    return `${yearString}/${monthString}/${dateString} - ${hourString}:${minuteString}`;
                }
            } else {
                return `${dateString}/${monthString}/${yearString} - ${hourString}:${minuteString}`;
            }
        } catch (error) {
            console.error(error);
        }
    }

    getTimeOnly(date) {
        try {
            if (!date) {
                return "";
            }
            var newDate = new Date(date);
            var yearString = newDate.getFullYear();
            var hourString = newDate.getHours();
            var minuteString = newDate.getMinutes();
            if (hourString.toString().length < 2) hourString = "0" + hourString;
            if (minuteString.toString().length < 2) minuteString = "0" + minuteString;
            return `${hourString}:${minuteString}`;
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Hàm format định dạng số
     * @created : quyetkaito 22/10/2022
     */
    formatNumber(n) {
        return new Intl.NumberFormat("vi-VN").format(n);
    }

}
export default new CommonFunction();