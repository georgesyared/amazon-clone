import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";


import { signIn , signOut , useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {

    const {data : session , status } = useSession();
    const loading = status === "loading";
    const router = useRouter();
    const item = useSelector(selectItems);
    return (
        <header>
          <div
            className="flex  items-center p-1 flex-grow py-2"
            style={{ background: "#131921" }}
          >
            {/* {Logo} */}
            <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
              <Image
                onClick={()=> router.push('/')}
                src="https://links.papareact.com/f90"
                width={150}
                height={40}
                objectFit="contain"
                className="cursor-pointer"

                alt=""
              />
            </div>
    
    
            {/* {Search} */}
            <div
              className="hidden sm:flex items-center h-10 
            rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500"
            >
              <input
                className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
                type="text"
              />
              <SearchIcon className="h-12 p-4" />
            </div>
            {/* {Right-Side} */}
            <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                <div onClick={!session ? signIn : signOut}  className="link">
                  {session ? `Hello, ${session.user.name}`: "Sign In"}
                  <p className="font-extrabold md:text-sm">Account & List </p>
                </div>
    
                <div className="link" onClick={()=> router.push('/orders')}>
                  <p>Returns</p>
                  <p className="font-extrabold md:text-sm">& Orders</p>
                </div>
    
                <div className="relative link flex items-center" onClick={()=> router.push('/checkout')}>
                  <span className="absolute right-0 top-0 md:right-10 h-4 w-4
                   bg-yellow-400 rounded-full text-black font-bold text-center">
                    {item.length}
                   </span>
                  <ShoppingCartIcon 
                  className="h-10"/>
                  <p className="font-extrabold md:text-sm hidden md:inline mt-2">Basket</p>
                </div>
            </div>
          </div>
    
          {/* {BottomNav} */}
          <div className="flex items-center space-x-3 p-2 pl-6 text-white text-sm"
           style={{background:"#232f3e"}}>
            <p className="link flex items-center">
               <MenuIcon className="h-6  mr-1" />
               All
            </p>
            <p className="link">Prime Video</p>
            <p className="link">Amazon Business</p>
            <p className='link'>Today s Deals</p>
            <p className="link hidden lg:inline-flex ">Electronics</p>
            <p className="link hidden lg:inline-flex ">Food & Grocery</p>
            <p className="link hidden lg:inline-flex ">Prime</p>
            <p className="link hidden lg:inline-flex ">Buy Again</p>
            <p className="link hidden lg:inline-flex ">Shopper Toolkit</p>
            <p className="link hidden lg:inline-flex ">Health & Personal Care</p>
    
          </div>
        </header>
      );
}

export default Header