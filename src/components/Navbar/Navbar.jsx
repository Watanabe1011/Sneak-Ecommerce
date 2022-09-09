import React, { useState } from "react";
import { useSelector } from "react-redux";
import Cart from "../../assets/images/icon-cart.svg";
import Close from "../../assets/images/icon-close.svg";
import Hamburger from "../../assets/images/icon-menu.svg";
import Avatar from "../../assets/images/image-avatar.png";
import Image1 from "../../assets/images/image-product-1.jpg";
import Logo from "../../assets/images/logo.svg";
import { products } from "../../features/cart/cartSlice";
import "./Navbar.css";

const Navbar = () => {
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { item, amount } = useSelector((state) => state.cart);

  return (
    <nav className="h-20 xl:h-24 bg-white-main ">
      <div className="h-full flex items-center justify-between w-[85%] xl:w-4/5 m-auto xl:border-b xl:border-dark-grayish-[gray]">
        <div className="flex item-center">
          <img
            src={Hamburger}
            alt=""
            className="w-[23px] xl:hidden mr-4"
            onClick={() => setShowMenuMobile((prev) => !prev)}
          />
          {showMenuMobile && (
            <ul className="fixed left-0 top-0 bottom-0 h-screen w-56 flex flex-col gap-5 pl-5 bg-white-main z-[999999999] pt-9 xl:hidden">
              <img
                src={Close}
                alt=""
                className="relative w-[20px] h-[20px] mb-10"
                onClick={() => setShowMenuMobile((prev) => !prev)}
              />
              <li>
                <a href="#" className="font-bold ">
                  Collection
                </a>
              </li>
              <li>
                <a href="#" className="font-bold ">
                  Men
                </a>
              </li>
              <li>
                <a href="#" className="font-bold ">
                  Women
                </a>
              </li>
              <li>
                <a href="#" className="font-bold ">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="font-bold ">
                  Contact
                </a>
              </li>
            </ul>
          )}
          <div className="flex items-center">
            <img src={Logo} alt="" className="xl:mr-16 " />
          </div>
          <ul className="hidden xl:flex xl:items-center xl:gap-6">
            <li className="relative leading-[80px]">
              <a href="#" className="links">
                Collection
              </a>
            </li>
            <li className="relative leading-[80px]">
              <a href="#" className="links">
                Men
              </a>
            </li>
            <li className="relative leading-[80px]">
              <a href="#" className="links">
                Women
              </a>
            </li>
            <li className="relative leading-[80px]">
              <a href="#" className="links">
                About
              </a>
            </li>
            <li className="relative leading-[80px]">
              <a href="#" className="links">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="flex gap-3 xl:gap-4 items-center">
          <div className="relative">
            <img
              src={Cart}
              alt=""
              className=" h-[20px] w-[20px] mr-4 xl:cursor-pointer"
              onClick={() => setShowCart((prev) => !prev)}
            />
            {item >= 1 && (
              <span className="absolute right-[10px] top-[-8px] bg-orange-main text-white-main rounded-full p-1 text-[8px]">
                {item}
              </span>
            )}
          </div>
          {showCart && (
            <>
              {item > 0 ? (
                <div className="w-[95%] m-auto xl:m-0 left-0 xl:left-[unset] rounded xl:w-[300px] flex flex-col gap-5 absolute bg-white-main top-[85px] pb-5 right-0 xl:right-36 shadow-xl">
                  <div className="border-b px-2 py-4 flex items-center">
                    <h3>Cart</h3>
                  </div>
                  <div className="flex gap-4 px-5">
                    <img
                      src={Image1}
                      alt=""
                      className="w-[40px] h-[40px] rounded"
                    />
                    <div className="flex flex-col">
                      <p className="text-[#999]  text-[15px]">
                        Fall Limited Edition Sneakers
                      </p>
                      <p className="text-[#999]">
                        {products[0].price} x {item}{" "}
                        <span className="font-bold text-black">${amount}</span>
                      </p>
                    </div>
                  </div>
                  <button className="bg-orange-main rounded text-white-main w-[95%] m-auto py-2">
                    Checkout
                  </button>
                </div>
              ) : (
                <div className="w-[95%] m-auto xl:m-0 left-0 xl:left-[unset] rounded xl:w-[300px] flex flex-col gap-5 absolute bg-white-main top-[85px] right-0 xl:right-36 shadow-xl">
                  <div className="border-b px-2 py-4 flex items-center">
                    <h3>Cart</h3>
                  </div>
                  <div className="h-20 text-center">
                    <h3>Your cart is empty.</h3>
                  </div>
                </div>
              )}
            </>
          )}

          <img src={Avatar} alt="" className="w-8 xl:w-11" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
