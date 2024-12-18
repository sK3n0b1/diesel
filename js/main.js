// Dropdown menu
document.addEventListener("DOMContentLoaded", function () {
	const dropdowns = document.querySelectorAll(".header__nav-item.dropdown");

	dropdowns.forEach(function (dropdown) {
		dropdown
			.querySelector(".dropdown__toggle")
			.addEventListener("click", function (e) {
				e.preventDefault();
				const menu = dropdown.querySelector(".dropdown__menu");
				menu.style.display =
					menu.style.display === "block" ? "none" : "block";
			});
	});

	document.addEventListener("click", function (e) {
		dropdowns.forEach(function (dropdown) {
			const menu = dropdown.querySelector(".dropdown__menu");
			if (!dropdown.contains(e.target)) {
				menu.style.display = "none";
			}
		});
	});
});

// Contact header menu

document.addEventListener("DOMContentLoaded", () => {
	const contactLink = document.querySelector(".header__link");
	const contactBlock = document.querySelector(".header__contact-block");

	// Функция переключения состояния контактного блока
	function toggleContactBlock() {
		contactBlock.classList.toggle("visible");
	}

	// Функция закрытия контактного блока
	function closeContactBlock() {
		contactBlock.classList.remove("visible");
	}

	// Обработчик нажатия на ссылку "Контакты"
	contactLink.addEventListener("click", (e) => {
		e.preventDefault(); // Отменяем стандартное поведение ссылки
		toggleContactBlock();
	});

	// Закрытие блока по клику на пустое пространство
	document.addEventListener("click", (e) => {
		const isClickInsideContactBlock = contactBlock.contains(e.target);
		const isClickOnLink = contactLink.contains(e.target);

		// Закрываем блок, если клик не на контактном блоке и не на ссылке
		if (!isClickInsideContactBlock && !isClickOnLink) {
			closeContactBlock();
		}
	});

	// Закрытие блока при нажатии на Escape
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeContactBlock();
		}
	});
});

// Burger
document.addEventListener("DOMContentLoaded", () => {
	// Управление бургер-меню
	const burgerIcon = document.querySelector(".burger-icon");
	const burgerMenu = document.querySelector(".burger-menu__nav");
	const body = document.body;

	function toggleMenu() {
		burgerMenu.classList.toggle("active");
		body.classList.toggle("menu-open"); // Чтобы запретить скроллинг при открытом меню
	}

	function closeMenu(event) {
		if (
			!burgerMenu.contains(event.target) &&
			!burgerIcon.contains(event.target)
		) {
			burgerMenu.classList.remove("active");
			body.classList.remove("menu-open");

			// Закрываем все аккордеоны при закрытии бургер-меню
			document.querySelectorAll(".burger-menu__item").forEach((item) => {
				item.classList.remove("open", "is-open");
				const dropdown = item.querySelector(".burger-menu-dropdown__list");
				if (dropdown) dropdown.style.maxHeight = null;
			});
		}
	}

	burgerIcon.addEventListener("click", (e) => {
		e.preventDefault(); // Предотвращение перехода по ссылке
		toggleMenu();
	});

	document.addEventListener("click", closeMenu);

	// Управление аккордеоном и поворотом иконок
	const toggles = document.querySelectorAll(".burger-menu__item");

	toggles.forEach((item) => {
		const link = item.querySelector(".burger-menu__link");
		const dropdown = item.querySelector(".burger-menu-dropdown__list");

		link.addEventListener("click", (event) => {
			event.preventDefault(); // Предотвращение перехода по ссылке

			// Закрываем все другие открытые меню
			toggles.forEach((otherItem) => {
				if (otherItem !== item) {
					otherItem.classList.remove("open", "is-open");
					const otherDropdown = otherItem.querySelector(
						".burger-menu-dropdown__list"
					);
					if (otherDropdown) otherDropdown.style.maxHeight = null;
				}
			});

			// Переключение текущего меню
			if (dropdown && dropdown.style.maxHeight) {
				dropdown.style.maxHeight = null; // Скрыть, если уже открыто
				item.classList.remove("open", "is-open"); // Убираем классы
			} else {
				if (dropdown)
					dropdown.style.maxHeight = dropdown.scrollHeight + "px"; // Открыть
				item.classList.add("open", "is-open"); // Добавляем классы
			}
		});
	});

	// Скрытие меню при ширине окна больше 992px
	const mediaQuery = window.matchMedia("(min-width: 992px)");

	function handleMediaQueryChange(e) {
		if (e.matches) {
			// Закрыть бургер-меню
			burgerMenu.classList.remove("active");
			body.classList.remove("menu-open");

			// Закрыть все аккордеоны
			toggles.forEach((item) => {
				item.classList.remove("open", "is-open");
				const dropdown = item.querySelector(".burger-menu-dropdown__list");
				if (dropdown) dropdown.style.maxHeight = null;
			});
		}
	}

	// Слушатель изменений ширины экрана
	mediaQuery.addEventListener("change", handleMediaQueryChange);

	// Выполнить проверку при загрузке страницы
	handleMediaQueryChange(mediaQuery);
});

// Сonsultation Accordion
document.addEventListener("DOMContentLoaded", () => {
	const firstAccordionItem = document.querySelector(
		".consultation__accordion-item"
	);
	if (firstAccordionItem) {
		firstAccordionItem.classList.add("active");
	}

	// Логика для переключения элементов аккордеона
	document
		.querySelectorAll(".consultation__accordion-header")
		.forEach((header) => {
			header.addEventListener("click", () => {
				const accordionItem = header.parentElement;

				// Закрыть все открытые элементы, если требуется режим "один открыт"
				document
					.querySelectorAll(".consultation__accordion-item")
					.forEach((item) => {
						if (item !== accordionItem) {
							item.classList.remove("active");
						}
					});

				// Переключение текущего элемента
				accordionItem.classList.toggle("active");
			});
		});
});

//  Services accordion

document.addEventListener("DOMContentLoaded", function () {
	const accordionItems = document.querySelectorAll(
		".services__accordion__inner"
	);

	accordionItems.forEach((item) => {
		const title = item.querySelector(".services__accordion__title");

		// Стили для заголовка
		title.style.display = "flex";
		title.style.alignItems = "center";
		title.style.justifyContent = "space-between"; // Разделяем текст и стрелку
		title.style.flexWrap = "nowrap"; // Запрещаем перенос элементов

		// Создаем SVG с фоном
		const svgIconWrapper = document.createElement("div");
		svgIconWrapper.style.cssText = `
			width: 50px;
			height: 50px;
			background-color: #1b1917;
			border-radius: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-shrink: 0; /* Запрещаем сжатие */
			margin-left: 10px; /* Отступ справа от текста */
			transition: transform 0.3s ease, color 0.3s ease;
		`;
		svgIconWrapper.innerHTML = `
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			  <path d="M1.5 14.5L14.5 1.5M14.5 1.5V13.98M14.5 1.5H2.02" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		`;

		// Добавляем SVG рядом с заголовком
		title.appendChild(svgIconWrapper);

		title.addEventListener("click", () => {
			// Убираем активный класс у всех остальных
			accordionItems.forEach((otherItem) => {
				if (otherItem !== item) {
					otherItem.classList.remove("active");
					const otherTitle = otherItem.querySelector(
						".services__accordion__title"
					);
					otherTitle.style.color = ""; // Сбрасываем цвет
					const otherSvgIcon = otherTitle.querySelector("div");
					if (otherSvgIcon) {
						otherSvgIcon.style.transform = "rotate(0deg)";
						otherSvgIcon.querySelector("svg path").style.stroke = "white";
					}
					otherItem.querySelector(
						".services__accordion__content"
					).style.maxHeight = null;
				}
			});

			// Переключаем активный класс на текущем элементе
			item.classList.toggle("active");
			const content = item.querySelector(".services__accordion__content");

			if (item.classList.contains("active")) {
				content.style.maxHeight = content.scrollHeight + "px";
				title.style.color = "var(--color-orange)"; // Меняем цвет на оранжевый
				svgIconWrapper.style.transform = "rotate(180deg)"; // Поворачиваем SVG
				svgIconWrapper.querySelector("svg path").style.stroke =
					"var(--color-orange)"; // Меняем цвет линии
			} else {
				content.style.maxHeight = null;
				title.style.color = ""; // Возвращаем цвет по умолчанию
				svgIconWrapper.style.transform = "rotate(0deg)"; // Сбрасываем поворот
				svgIconWrapper.querySelector("svg path").style.stroke = "white"; // Сбрасываем цвет линии
			}
		});
	});
});

// Shop block

function adjustShopLayout() {
	const shopInner = document.querySelector(".shop__inner");

	if (shopInner) {
		const shopItemLeft = shopInner.querySelector(".shop__item-left");
		const shopItemRight = shopInner.querySelector(".shop__item-right");
		const shopDescr = shopInner.querySelector(".shop__item-descr");
		const shopButton = shopInner.querySelector(".shop__item-button");
		const shopImage = shopInner.querySelector(".shop__item-image");

		if (window.innerWidth <= 992) {
			shopInner.style.display = "flex";
			shopInner.style.flexDirection = "column";
			shopInner.style.alignItems = "center";
			shopInner.style.justifyContent = "center";
			shopInner.style.textAlign = "center";

			if (
				shopDescr &&
				shopButton &&
				shopImage &&
				!shopDescr.nextElementSibling?.classList.contains(
					"shop__item-image"
				)
			) {
				shopDescr.insertAdjacentElement("afterend", shopImage);
			}
		} else {
			shopInner.style.display = "";
			shopInner.style.flexDirection = "";
			shopInner.style.alignItems = "";
			shopInner.style.justifyContent = "";
			shopInner.style.textAlign = "";

			if (shopItemRight && shopImage && !shopItemRight.contains(shopImage)) {
				shopItemRight.appendChild(shopImage);
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", adjustShopLayout);

window.addEventListener("resize", adjustShopLayout);

// Accordion question

document
	.querySelectorAll(".question__accordion__item-title")
	.forEach((title) => {
		title.style.display = "flex";
		title.style.alignItems = "center";
		title.style.justifyContent = "space-between";
		title.style.flexWrap = "nowrap"; // Запрещаем перенос элементов

		const svgIconWrapper = document.createElement("div");
		svgIconWrapper.style.cssText = `
      width: 50px;
      height: 50px;
      background-color: #1b1917;
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0; /* Запрещаем сжатие */
      margin-left: 10px; /* Отступ между текстом и иконкой */
      transition: transform 0.3s ease, color 0.3s ease;
    `;
		svgIconWrapper.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 14.5L14.5 1.5M14.5 1.5V13.98M14.5 1.5H2.02" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
		title.appendChild(svgIconWrapper);

		title.addEventListener("click", () => {
			const parent = title.parentElement;
			const content = parent.querySelector(
				".question__accordion__item-descr"
			);

			if (parent.classList.contains("open")) {
				closeAccordion(parent, content, svgIconWrapper, title);
			} else {
				document
					.querySelectorAll(".question__accordion__item")
					.forEach((item) => {
						if (item !== parent && item.classList.contains("open")) {
							const otherContent = item.querySelector(
								".question__accordion__item-descr"
							);
							const otherTitle = item.querySelector(
								".question__accordion__item-title"
							);
							const otherSvgIcon = otherTitle.querySelector("div");
							closeAccordion(
								item,
								otherContent,
								otherSvgIcon,
								otherTitle
							);
						}
					});

				openAccordion(parent, content, svgIconWrapper, title);
			}
		});
	});

function openAccordion(item, content, svgIconWrapper, title) {
	item.classList.add("open");
	content.style.height = content.scrollHeight + "px";
	title.style.color = "var(--color-orange)";
	svgIconWrapper.style.transform = "rotate(180deg)";
	svgIconWrapper.querySelector("svg path").style.stroke =
		"var(--color-orange)";
}

function closeAccordion(item, content, svgIconWrapper, title) {
	content.style.height = content.scrollHeight + "px";
	requestAnimationFrame(() => {
		content.style.height = "0";
	});
	item.classList.remove("open");
	title.style.color = "";
	svgIconWrapper.style.transform = "rotate(0deg)";
	svgIconWrapper.querySelector("svg path").style.stroke = "white";
}

document
	.querySelectorAll(".question__accordion__item-descr")
	.forEach((content) => {
		content.addEventListener("transitionend", () => {
			if (!content.parentElement.classList.contains("open")) {
				content.style.height = "";
			}
		});
	});

// footer

document.addEventListener("DOMContentLoaded", () => {
	const footerPrivacy = document.querySelector(".footer__privacy");
	const footerMap = document.querySelector(".footer__map");
	const footerRight = document.querySelector(".footer__block-rigth");
	const footerLeft = document.querySelector(".footer__block-left");

	function toggleFooterElements() {
		const screenWidth = window.innerWidth;

		if (screenWidth <= 992) {
			if (!footerPrivacy.closest(".footer__block-rigth")) {
				footerRight.appendChild(footerPrivacy);
				footerLeft.appendChild(footerMap);
			}
		} else {
			if (!footerPrivacy.closest(".footer__block-left")) {
				footerLeft.appendChild(footerPrivacy);
				footerRight.appendChild(footerMap);
			}
		}
	}

	// Вызываем функцию при загрузке страницы и при изменении размера окна
	toggleFooterElements();
	window.addEventListener("resize", toggleFooterElements);
});

// Popup

document.addEventListener("DOMContentLoaded", () => {
	const popupWrapper = document.querySelector(".popup-wrapper");
	const openPopupBtn = document.querySelector(".open-popup");
	const closePopupBtn = document.querySelector(".popup-close");

	// Проверяем, закрыто ли окно
	const isPopupClosed = localStorage.getItem("popupClosed") === "true";

	if (!isPopupClosed) {
		popupWrapper.classList.add("active"); // Показываем окно
		document.body.classList.add("no-scroll"); // Блокируем прокрутку
		localStorage.setItem("popupOpened", "true"); // Устанавливаем флаг открытого окна
	}

	// Функция для открытия окна
	const openPopup = (event) => {
		if (event) event.preventDefault(); // Предотвращаем стандартное поведение
		popupWrapper.classList.add("active");
		document.body.classList.add("no-scroll"); // Блокируем прокрутку
		localStorage.setItem("popupOpened", "true"); // Устанавливаем флаг открытого окна
		localStorage.removeItem("popupClosed");
	};

	// Функция для закрытия окна
	const closePopup = (event) => {
		if (event) event.preventDefault(); // Предотвращаем стандартное поведение
		popupWrapper.classList.remove("active");
		document.body.classList.remove("no-scroll"); // Разрешаем прокрутку
		localStorage.setItem("popupClosed", "true");
		localStorage.removeItem("popupOpened"); // Убираем флаг открытого окна
	};

	// Добавляем события на кнопки открытия и закрытия
	if (openPopupBtn) {
		openPopupBtn.addEventListener("click", openPopup);
	}

	if (closePopupBtn) {
		closePopupBtn.addEventListener("click", closePopup);
	}

	// Закрытие окна при клике на фон
	if (popupWrapper) {
		popupWrapper.addEventListener("click", (event) => {
			if (event.target === popupWrapper) {
				closePopup(event);
			}
		});
	}

	// При перезагрузке страницы проверяем флаг popupOpened и закрываем окно
	if (localStorage.getItem("popupOpened") === "true") {
		closePopup(); // Закрываем окно и сбрасываем флаг
	}
});


// Popup callback

document.addEventListener("DOMContentLoaded", () => {
    const popupOverlay = document.querySelector(".custom-overlay-wrapper");
    const closeButton = document.querySelector(".custom-popup-close");
    const openButton = document.querySelector(".trigger-custom-popup"); // Новый класс кнопки

    // Открытие popup
    const openPopup = () => {
        popupOverlay.classList.add("active");
    };

    // Закрытие popup
    const closePopup = () => {
        popupOverlay.classList.remove("active");
    };

    // Привязка событий
    closeButton.addEventListener("click", closePopup);
    openButton.addEventListener("click", openPopup);

    // Закрытие при клике на фон
    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
});
