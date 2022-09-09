import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../assets/images/icon-cart.svg";
import Minus from "../assets/images/icon-minus.svg";
import NextIcon from "../assets/images/icon-next.svg";
import Plus from "../assets/images/icon-plus.svg";
import PrevIcon from "../assets/images/icon-previous.svg";
import Image1 from "../assets/images/image-product-1.jpg";
import Image2 from "../assets/images/image-product-2.jpg";
import Image3 from "../assets/images/image-product-3.jpg";
import Image4 from "../assets/images/image-product-4.jpg";
import {
  addItem,
  addToCart,
  decreaseItem,
  products,
} from "../features/cart/cartSlice";
import "./Products.css";

const data = [
  {
    image: Image1,
  },
  {
    image: Image2,
  },

  {
    image: Image3,
  },

  {
    image: Image4,
  },
];

const Products = () => {
  const { item } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [image, setImage] = useState(data);
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > image.length - 1) {
        index = 0;
      }
      return index;
    });
  };
  const prevSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex - 1;
      if (index < 0) {
        index = image.length - 1;
      }
      return index;
    });
  };

  useEffect(() => {
    const lastIndex = image.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, image]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let index = oldIndex + 1;
        if (index > image.length - 1) {
          index = 0;
        }
        return index;
      });
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  const [showProductModal, setShowProductModal] = useState(false);

  const productModal = useRef("");

  useEffect(() => {
    /**
     * Perform if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (
        productModal.current &&
        !productModal.current.contains(event.target)
      ) {
        setShowProductModal(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productModal]);

  return (
    <main className="xl:w-4/5 m-auto pb-5">
      <div className="flex flex-col xl:flex-row items-center pb-5 xl:mt-14 xl:justify-between xl:gap-24">
        <div className="mb-5">
          <img
            src={Image1}
            alt="Autumn Sneakers"
            className="hidden xl:inline-block w-full rounded-xl mb-5"
            onClick={() => setShowProductModal((prev) => !prev)}
          />
          <div className="section-center w-full xl:hidden">
            {image.map((img, imageIndex) => {
              let position = "nextSlide";
              if (imageIndex === index) {
                position = "activeSlide";
              }
              if (
                imageIndex === index - 1 ||
                (index === 0 && imageIndex === image.length - 1)
              ) {
                position = "lastSlide";
              }

              return (
                <div key={imageIndex}>
                  <article className={position}>
                    <img src={img.image} className="rounded w-full" />
                  </article>
                  <button className="prev" onClick={() => setIndex(index - 1)}>
                    <img src={PrevIcon} alt="" />
                  </button>
                  <button className="next" onClick={() => setIndex(index + 1)}>
                    <img src={NextIcon} alt="" />
                  </button>
                </div>
              );
            })}
          </div>

          <div
            className="hidden xl:flex item-center gap-5"
            onClick={() => console.log("hello")}
          >
            {data.map((image, idx) => (
              <img
                key={idx}
                src={image.image}
                alt="Autumn Sneakers"
                className="w-28 rounded-xl cursor-pointer hover:opacity-[0.5]"
                onClick={() => setShowProductModal((prev) => !prev)}
              />
            ))}
          </div>
          {showProductModal && (
            <div className="bg-dark-modal h-screen fixed w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <div
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                ref={productModal}
                onClick={() => console.log("hello")}
              >
                <img
                  src={Image1}
                  alt="Autumn Sneakers"
                  className="rounded-xl mb-5 min-h-[400px] w-[400px] m-auto"
                />
                <div className="flex gap-5">
                  {data.map((image, idx) => (
                    <img
                      key={idx}
                      src={image.image}
                      alt="Autumn Sneakers"
                      className=" rounded-xl h-[90px] w-[90px]"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-4/5 m-auto xl:w-[unset] xl:flex xl:flex-col xl:gap-5">
          <h2 className="mb-4 xl:mb-0 text-orange-main font-bold uppercase tracking-wide">
            Sneaker Company
          </h2>
          <h1 className="mb-4 xl:mb-0 text-3xl xl:text-6xl font-bold">
            Fall Limited Edition Sneakers
          </h1>
          <p className="text-[#999] mb-4 xl:mb-0">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>
          <div className="flex item-center justify-between xl:block mb-4 xl:m-0">
            {products &&
              products.map((product, idx) => (
                <div className="flex items-center gap-4" key={idx}>
                  <p className="font-bold text-2xl">${product.price}</p>
                  <span className="bg-pale-orange text-orange-main py-1 px-3 rounded font-bold">
                    50%
                  </span>
                </div>
              ))}
            <p className="line-through text-[#999]">$250.00</p>
          </div>
          <div className="xl:flex justify-between gap-4">
            <div className="flex mb-4 xl:mb-0">
              <button
                className="bg-light-grayish-blue e w-full xl:w-12 h-12"
                onClick={() => {
                  if (item <= 0) {
                    return;
                  }
                  dispatch(decreaseItem());
                }}
              >
                <img src={Minus} alt="" className="m-auto" />
              </button>
              <h3 className="bg-light-grayish-blue e w-full xl:w-12 flex items-center justify-center h-12">
                {item}
              </h3>
              <button
                className="bg-light-grayish-blue w-full xl:w-12 h-12"
                onClick={() => dispatch(addItem())}
              >
                <img src={Plus} alt="" className="m-auto" />
              </button>
            </div>
            <button
              className="w-full bg-orange-main flex-[1] flex items-center justify-center text-white-main gap-4 rounded h-12 active:scale-[0.98] hover:opacity-[0.8]"
              onClick={() => dispatch(addToCart())}
            >
              <img src={Cart} alt="" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
