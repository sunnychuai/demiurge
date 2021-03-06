define(function(require) {
    var $ = require('jquery');
    require('jquery.validate');

    /*本地化提示信息*/
    $.extend($.validator.messages, {
        required: "请填写内容",
        remote: "请修正该字段",
        email: "请输有效的电子邮件",
        url: "请输入有效的网址",
        date: "请输入有效的日期（示例：2015-6-30）",
        dateISO: "请输入有效的日期（示例：2015-06-30）.",
        number: "请输入数字",
        digits: "请输入整数",
        creditcard: "请输入有效的信用卡号",
        equalTo: "两次输入不一样，请重新输入",
        accept: "请选择png、jpg、jpeg或gif格式的图片",
        maxlength: $.validator.format("最多请输入{0}个字"),
        minlength: $.validator.format("请至少输入{0}个字"),
        rangelength: $.validator.format("长度请在 {0} - {1} 位之间"),
        range: $.validator.format("请输入介于 {0} 和 {1} 之间的数字"),
        max: $.validator.format("请填写不大于{0}的数字"),
        min: $.validator.format("请填写不小于{0}的数字")
    });﻿

    /*计算字符长度（两个英文算一个字）*/
    function getByteLength(str) {
        return str.replace(/[^\x00-\xff]/g, "--").length / 2;
    }

    $.validator.addMethod("maxlength2", function(value, element, param){
        return this.optional(element) || getByteLength($.trim(value)) <= param;
    }, $.validator.format("最多请输入{0}个字"));

    $.validator.addMethod("minlength2", function(value, element, param){
        return this.optional(element) || getByteLength($.trim(value)) >= param;
    }, $.validator.format("请至少输入{0}个字"));

    $.validator.addMethod("rangelength2", function(value, element, param){
        var length = getByteLength($.trim(value));
        return this.optional(element) || (length >= param[0] && length <= param[1]);
    }, $.validator.format("长度请介于 {0} 和 {1} 之间"));

    // 手机号
    $.validator.addMethod("mobile", function(value, element, param){
        var reg = /^1\d{10}$/;
        return this.optional(element) || reg.test($.trim(value));
    }, $.validator.format("请检查手机格式"));

    /**
    * Return true if the field value matches the given format RegExp
    *
    * @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
    * @result true
    *
    * @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
    * @result false
    *
    * @name $.validator.methods.pattern
    * @type Boolean
    * @cat Plugins/Validate/Methods
    */
    $.validator.addMethod("pattern", function(value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        if (typeof param === "string") {
            param = new RegExp("^(?:" + param + ")$");
        }
        return param.test(value);
    }, "格式不正确");

    $.validator.setDefaults({
        errorPlacement: function($error, $elem) {
            $elem.closest('.field_wrap').append($error);
        }
    });
});