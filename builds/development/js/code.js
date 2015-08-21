// Приложение
$(document).ready(function() {
	
	var app = (function(){
		// Модуль для валидации полей ввода
		this.validate = function(inputName) {
			
			// Класс для работы с полем ввода
			// @param {Object} obj - jQuery Object - HTML Element поле ввода
			// @return {Object}
			var Input = function Input(obj){
				var Input = function Input(obj) {
					this.elem = obj;
					this.error = new Error(obj);
					this.success = new Success();
					this.validate = false;
				}
					
				Input.prototype.getValue = function() {
					return this.elem.val();
				}
				
				Input.prototype.setValidate = function(bool) {
					if(bool !== "") {
						this.validate = bool;
					}
					else {
						return this.validate;
					}
				}
					
				function init() {
					var tempNew = new Input(obj);
					return tempNew;
				}
				
				return init();
			}
			
			// "Класс"" для работы с выводом ошибок
			// @param {Object} input - HTML Element поле ввода
			// @return {Object}
			this.Error = function Error(input) {
				
				function Error(input) {
					this.elem = $(".form-group__error")[0];
				}
		
				// Метод для отображения ошибок пользователю
				// errorMsg - сообщение, которое будет выведено пользователю
				Error.prototype.view = function(errorMsg) {
					$(this.elem).text(errorMsg);
				}
		
				// Метод для удаления сообщения об ошибке
				Error.prototype.remove = function() {
					$(this.elem).text("");
				}
				
				return new Error(input);
			}
			
			// "Класс"" для работы c выводом результата
			// @return {Object}
			this.Success = function Success() {
				
				function Success() {
					this.elem = $(".result");
					this.tmpResult = Handlebars.compile($('#tmpResult').html());
					this.tmpPopup  = Handlebars.compile($('#tmpPopup').html());
				}
				
				// Метод для отображения результата ввода
				// @param {Array} msg - {Фамилия, Имя, Отчество}
				Success.prototype.view = function(msg) {
					
					function getObj(msg) {
						var data = {
 						  namefirst : msg[1],
						  namesecond : msg[2],
						  surname : msg[0]
						}
						
						return data;
					}
		
					$(this.elem).html(this.tmpResult(getObj(msg)));
					$('#popup').html(this.tmpPopup(getObj(msg)));
				}
				
				// Метод для диактивациия результата вывода
				Success.prototype.remove = function() {
					$(this.elem).html("");	
				}
				
				return new Success()
			}
		
	
			// Инициализация
			this.init = function(inputName) {
				var inputs = $(inputName);
				
				// Добавляем обработчик события для элемента
				inputs.each(function(index){
					newInput = new Input($(this));
					newInput.elem.keyup(function(){
						var input = newInput;
						
						var str = input.getValue(); 
						
						if(result = (/[^\s\-а-яёa-z]/i).test(str)) {
							input.success.remove();
							input.error.view("Неправильный формат ввода");
						}
						else {
							var answer = str.replace(/\s+/, ' ').split(' ');
								
							if(answer.length != 3) {
								input.success.remove();
								input.error.view("Введите фамилию, имя и отчество");
							}
							else {
								//input.validate("true");
								input.error.remove();
								input.success.view(answer);
							}
						}
					});
				});	
			}
			
			return this.init(inputName);
		}
		
		this.init = function() {
			this.validate(".js-app-name");
			$('#popup').popup();	
		}
		
		// Инициализация приложения
		this.init();
	})();

});