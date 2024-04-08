import React, { createContext, useContext, useState ,useEffect } from 'react';
import { fireDB as fireDb } from '../firebase/FirebaseConfig';
import { Timestamp, addDoc,deleteDoc, collection, onSnapshot, orderBy, query,setDoc,doc
,getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';


export const EcomContext = createContext({
    mode: 'light', // Default mode
    toggleMode: () => {} // Default empty function
});

export const EcomProvider = ({ children }) => {
    const [mode, setMode] = useState('light');
    const [loading, setLoading] = useState(false);

    const toggleMode = () => {
        // console.log('Toggle mode function called');
        if (mode === 'light') {
            // console.log('Switching to dark mode');
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        } else {
            // console.log('Switching to light mode');
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    };

    // console.log('Current mode:', mode);


    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
    
      })
    
      // ********************** Add Product Section  **********************
      const addProduct = async () => {
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
          return toast.error('Please fill all fields')
        }
        const productRef = collection(fireDb, "products")
        setLoading(true)
        try {
          await addDoc(productRef, products)
          toast.success("Product Add successfully")
         setTimeout(() => {
          window.location.href ='/dashboard'
         }, 800);
          getProductData()
          setLoading(false)
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
        setProducts("")
      }
    
      const [product, setProduct] = useState([]);
    
      // ****** get product
      const getProductData = async () => {
        setLoading(true)
        try {
          const q = query(
            collection(fireDb, "products"),
            orderBy("time"),
            // limit(5)
          );

          const data = onSnapshot(q, (QuerySnapshot) => {
            let productsArray = [];
            QuerySnapshot.forEach((doc) => {
              productsArray.push({ ...doc.data(), id: doc.id });
            });
            setProduct(productsArray)
            setLoading(false);
          });

          return () => data;
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }

      const [order, setOrder] = useState([]);

      const getOrderData = async () => {
        setLoading(true)
        try {
          const result = await getDocs(collection(fireDb, "order"))
          const ordersArray = [];
          result.forEach((doc) => {
            ordersArray.push(doc.data());
            setLoading(false)
          });
          setOrder(ordersArray);
          console.log(ordersArray)
          setLoading(false);
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }


      const [user, setUser] = useState([]);

      const getUserData = async () => {
        setLoading(true)
        try {
          const result = await getDocs(collection(fireDb, "users"))
          const usersArray = [];
          result.forEach((doc) => {
            usersArray.push(doc.data());
            setLoading(false)
          });
          setUser(usersArray);
          console.log(usersArray)
          setLoading(false);
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }
    
    
    
    
      useEffect(() => {
        getProductData();
        getOrderData();
        getUserData();
      }, []);


      const edithandle = (item) => {
        setProducts(item)
      }
      // update product
      const updateProduct = async (item) => {
        setLoading(true)
        try {
          await setDoc(doc(fireDb, "products", products.id), products);
          toast.success("Product Updated successfully")
          setTimeout(() => {
            window.location.href ='/dashboard'
           }, 800);
          getProductData();
          setLoading(false)
          window.location.href = '/dashboard'
        } catch (error) {
          setLoading(false)
          console.log(error)
        }
        setProducts("")
      }
    
      const deleteProduct = async (item) => {
    
        try {
          setLoading(true)
          await deleteDoc(doc(fireDb, "products", item.id));
          toast.success('Product Deleted successfully')
          setLoading(false)
          getProductData()
        } catch (error) {
          // toast.success('Product Deleted Falied')
          setLoading(false)
        }
      }
    
  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

    return (
        <EcomContext.Provider value={{ mode, toggleMode, loading,setLoading,
            products, setProducts,addProduct,product,edithandle
            ,order,user,deleteProduct,updateProduct,searchkey, setSearchkey,filterType, setFilterType,
            filterPrice, setFilterPrice}}>
            {children}
        </EcomContext.Provider>
    );
};

export const useEcom = () => {
    const context = useContext(EcomContext);
    // console.log('Context:', context);
    return context;
};
