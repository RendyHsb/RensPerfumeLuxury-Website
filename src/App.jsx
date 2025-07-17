import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';
import ConfirmationDialog from './components/ConfirmationDialog';
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from "./pages/TermsPage";
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HelpPage from './pages/HelpPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [productToEdit, setProductToEdit] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
  const [cartItems, setCartItems] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    let unsubscribeAuth = () => {};

    const initializeFirebase = async () => {
      try {
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = {
          apiKey: "AIzaSyA-qiberjDwwgtfP-IuybBJp81uvL-VRT0",
          authDomain: "rensperfumeluxury-web.firebaseapp.com",
          projectId: "rensperfumeluxury-web",
          storageBucket: "rensperfumeluxury-web.firebasestorage.app",
          messagingSenderId: "616923399377",
          appId: "1:616923399377:web:0ce7e96f85792212e431f0",
          measurementId: "G-7VBJSQEMQ0"
        };

        if (!Object.keys(firebaseConfig).length || !firebaseConfig.apiKey) {
          setToastMessage("Kesalahan konfigurasi Firebase: Proyek Firebase tidak terhubung atau konfigurasi API hilang. Silakan hubungkan proyek Firebase Anda.", 'error');
          setIsAuthReady(true);
          return;
        }

        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        const firebaseAuth = getAuth(app);

        setDb(firestore);
        setAuth(firebaseAuth);

        unsubscribeAuth = onAuthStateChanged(firebaseAuth, async (user) => {
          if (user) {
            setCurrentUser(user);
            if (firestore) {
              try {
                const userDocRef = doc(firestore, `artifacts/${appId}/users/${user.uid}/user_data/profile`);
                const userDocSnap = await getDoc(userDocRef);
                if (!userDocSnap.exists()) {
                  await setDoc(userDocRef, { email: user.email, createdAt: new Date() }, { merge: true });
                }
              } catch (firestoreError) {
                setToastMessage(`Error Firestore: ${firestoreError.message}`, 'error');
              }
            }
          } else {
            setCurrentUser(null);
          }
          setIsAuthReady(true);
        });

        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
        if (initialAuthToken) {
          await signInWithCustomToken(firebaseAuth, initialAuthToken)
            .catch((error) => {
              setToastMessage(`Gagal masuk otomatis: ${error.message}`, 'error');
              signInAnonymously(firebaseAuth).catch(err => {});
            });
        } else {
          await signInAnonymously(firebaseAuth).catch(err => {});
        }

      } catch (error) {
        setToastMessage(`Error menginisialisasi Firebase: ${error.message}. Periksa konsol browser untuk detail.`, 'error');
        setIsAuthReady(true);
      }
    };

    initializeFirebase();

    return () => {
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }
    };
  }, []);

  useEffect(() => {
    if (db && isAuthReady) {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const productsCollectionRef = collection(db, `artifacts/${appId}/public/data/products`);

      const unsubscribeProducts = onSnapshot(productsCollectionRef, (snapshot) => {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
        setIsProductsLoading(false);
      }, (error) => {
        setToastMessage(`Gagal mengambil produk: ${error.message}`, 'error');
        setIsProductsLoading(false);
      });

      return () => unsubscribeProducts();
    }
  }, [db, isAuthReady, setToastMessage]);

  useEffect(() => {
    if (db && currentUser && isAuthReady) {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const ordersCollectionRef = collection(db, `artifacts/${appId}/users/${currentUser.uid}/orders`);
      const unsubscribeOrders = onSnapshot(ordersCollectionRef, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrderHistory(ordersData);
      }, (error) => {
        setToastMessage(`Gagal mengambil riwayat pesanan: ${error.message}`, 'error');
      });
      return () => unsubscribeOrders();
    } else if (isAuthReady && !currentUser) {
      setOrderHistory([]);
    }
  }, [db, currentUser, isAuthReady, setToastMessage]);

  const handleNavigate = useCallback((page, message = '', type = 'info', category = 'all') => {
    setCurrentPage(page);
    setToastMessage(message);
    setToastType(type);
    setSelectedCategory(category);
    if (page !== 'edit') {
      setProductToEdit(null);
    }
  }, [setCurrentPage, setToastMessage, setToastType, setProductToEdit, setSelectedCategory]);

  const handleLogin = useCallback(async (email, password) => {
    if (!auth) {
      setToastMessage("Sistem otentikasi belum siap. Coba lagi sebentar atau refresh halaman.", 'error');
      throw new Error("Firebase Auth belum diinisialisasi.");
    }
    await signInWithEmailAndPassword(auth, email, password);
  }, [auth, isAuthReady, setToastMessage]);

  const handleRegister = useCallback(async (email, password) => {
    if (!auth) {
      setToastMessage("Sistem pendaftaran belum siap. Coba lagi sebentar atau refresh halaman.", 'error');
      throw new Error("Firebase Auth belum diinisialisasi.");
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (db) {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/user_data/profile`);
      await setDoc(userDocRef, { email: user.email, createdAt: new Date() }, { merge: true });
    } else {
        setToastMessage("Profil pengguna tidak dapat disimpan karena Firestore belum siap.", 'warning');
    }
  }, [auth, db, isAuthReady, setToastMessage]);

  const handleLogout = useCallback(async () => {
    if (!auth) {
      setToastMessage('Firebase Auth belum diinisialisasi.', 'error');
      return;
    }
    try {
      await signOut(auth);
      setToastMessage('Berhasil keluar!', 'info');
      handleNavigate('home');
    } catch (error) {
      setToastMessage(`Gagal keluar: ${error.message}`, 'error');
    }
  }, [auth, handleNavigate, setToastMessage]);

  const handleAddProduct = useCallback(async (newProduct) => {
    if (!db || !currentUser) {
      setToastMessage('Anda harus login untuk menambah produk.', 'error');
      return;
    }
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const productsCollectionRef = collection(db, `artifacts/${appId}/public/data/products`);
    try {
      await addDoc(productsCollectionRef, newProduct);
      setToastMessage('Produk berhasil ditambahkan!', 'success');
    } catch (error) {
      setToastMessage(`Gagal menambah produk: ${error.message}`, 'error');
    }
  }, [db, currentUser, setToastMessage]);

  const handleUpdateProduct = useCallback(async (updatedProduct) => {
    if (!db || !currentUser) {
      setToastMessage('Anda harus login untuk memperbarui produk.', 'error');
      return;
    }
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const productDocRef = doc(db, `artifacts/${appId}/public/data/products`, updatedProduct.id);
    try {
      await setDoc(productDocRef, updatedProduct, { merge: true });
      setToastMessage('Produk berhasil diperbarui!', 'success');
    } catch (error) {
      setToastMessage(`Gagal memperbarui produk: ${error.message}`, 'error');
    }
  }, [db, currentUser, setToastMessage]);

  const handleDeleteProduct = useCallback(async (id) => {
    if (!db || !currentUser) {
      setToastMessage('Anda harus login untuk menghapus produk.', 'error');
      return;
    }
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const productDocRef = doc(db, `artifacts/${appId}/public/data/products`, id);
    try {
      await deleteDoc(productDocRef);
      setToastMessage('Produk berhasil dihapus!', 'success');
    } catch (error) {
      setToastMessage(`Gagal menghapus produk: ${error.message}`, 'error');
    }
  }, [db, currentUser, setToastMessage]);

  const confirmDeleteProduct = useCallback(() => {
    handleDeleteProduct(productIdToDelete);
    setIsConfirmDialogOpen(false);
    setProductIdToDelete(null);
  }, [handleDeleteProduct, productIdToDelete, setIsConfirmDialogOpen, setProductIdToDelete]);

  const cancelDeleteProduct = useCallback(() => {
    setIsConfirmDialogOpen(false);
    setProductIdToDelete(null);
  }, [setIsConfirmDialogOpen, setProductIdToDelete]);

  const handleAddToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        setToastMessage(`${product.name} kuantitas diperbarui di keranjang!`, 'info');
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        setToastMessage(`${product.name} ditambahkan ke keranjang!`, 'success');
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }, [setCartItems, setToastMessage]);

  const handleUpdateCartItemQuantity = useCallback((id, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        setToastMessage('Item dihapus dari keranjang.', 'info');
        return prevItems.filter((item) => item.id !== id);
      }
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  }, [setCartItems, setToastMessage]);

  const handleRemoveItemFromCart = useCallback((id) => {
    setCartItems((prevItems) => {
      setToastMessage('Item dihapus dari keranjang!', 'success');
      return prevItems.filter((item) => item.id !== id);
    });
  }, [setCartItems, setToastMessage]);

  const handleCheckout = useCallback(async () => {
    if (!db || !currentUser || cartItems.length === 0) {
      setToastMessage('Keranjang kosong atau Anda belum login.', 'error');
      return;
    }

    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const ordersCollectionRef = collection(db, `artifacts/${appId}/users/${currentUser.uid}/orders`);

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderData = {
      userId: currentUser.uid,
      timestamp: new Date(),
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        images: item.images,
      })),
      totalAmount: totalAmount,
      status: 'pending',
    };

    try {
      await addDoc(ordersCollectionRef, orderData);
      setCartItems([]);
      handleNavigate('home', 'Pembelian Berhasil! Terima kasih telah berbelanja.', 'success');
    } catch (error) {
      setToastMessage(`Gagal menyimpan pesanan: ${error.message}`, 'error');
    }
  }, [db, currentUser, cartItems, handleNavigate, setToastMessage, setCartItems]);

  const handleCloseToast = useCallback(() => {
    setToastMessage('');
  }, [setToastMessage]);

  const brandName = "RensPerfumeLuxury";

  if (!isAuthReady || isProductsLoading) {
    return (
      <div className="min-h-screen bg-primary-dark text-primary-light flex flex-col items-center justify-center">
        <motion.img
          src="/LogoRpl.png"
          alt="RensPerfumeLuxury Loading"
          className="w-40 h-auto mb-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: [0.5, 1.05, 1],
          }}
          transition={{
            duration: 2, // Durasi animasi logo diperlama
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 2, // Jeda sebelum mengulang animasi logo diperlama
          }}
        />
        <motion.div
          className="font-playfair text-xl sm:text-2xl text-accent-gold tracking-wider mb-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.06, // Jeda antar karakter sedikit diperlama
                delayChildren: 0.5, // Mulai animasi teks setelah logo sedikit lebih lama
              },
            },
          }}
        >
          {brandName.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }, // Durasi muncul karakter diperlama
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
        <motion.p
          className="font-inter text-base sm:text-lg text-primary-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} // Durasi berkedip diperlama
        >
          Memuat...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="bg-primary-light min-h-screen flex flex-col font-inter text-text-dark relative">
      <Navbar
        onNavigate={handleNavigate}
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        currentUser={currentUser}
        onLogout={handleLogout}
        selectedCategory={selectedCategory}
      />

      <main className="flex-grow relative z-10 pt-[100px] sm:pt-[100px]">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <HomePage
              key="home"
              products={products}
              onAddToCart={handleAddToCart}
              onDeleteProduct={handleDeleteProduct}
              onEditProduct={(product) => {
                setProductToEdit(product);
                handleNavigate('edit');
              }}
              currentUser={currentUser}
              onNavigate={handleNavigate}
              selectedCategory={selectedCategory}
            />
          )}
          {currentPage === 'about' && <AboutPage key="about" />}
          {currentPage === 'contact' && <ContactPage key="contact" onNavigate={handleNavigate} />}
          {currentPage === 'privacy' && <PrivacyPolicyPage key="privacy" />}
          {currentPage === 'terms' && <TermsPage key="terms" />}
          {currentPage === 'cart' && (
            <CartPage
              key="cart"
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateCartItemQuantity}
              onRemoveItem={handleRemoveItemFromCart}
              onNavigate={handleNavigate}
              onCheckout={handleCheckout}
            />
          )}
          {currentPage === 'checkout' && (
            <CheckoutPage
              key="checkout"
              cartItems={cartItems}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'login' && (
            <LoginPage
              key="login"
              onLogin={handleLogin}
              onNavigate={handleNavigate}
              toast={setToastMessage}
            />
          )}
          {currentPage === 'register' && (
            <RegisterPage
              key="register"
              onRegister={handleRegister}
              onNavigate={handleNavigate}
              toast={setToastMessage}
            />
          )}
          {currentPage === 'add' && (
            <AddProductPage
              key="add"
              onAddProduct={handleAddProduct}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'edit' && productToEdit && (
            <EditProductPage
              key="edit"
              productToEdit={productToEdit}
              onUpdateProduct={handleUpdateProduct}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'help' && <HelpPage key="help" />}
          {currentPage === 'orderHistory' && (
            <OrderHistoryPage
              key="orderHistory"
              orderHistory={orderHistory}
              onNavigate={handleNavigate}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigate} />

      <ToastNotification
        message={toastMessage}
        type={toastType}
        onClose={handleCloseToast}
      />

      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        message="Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan."
        onConfirm={confirmDeleteProduct}
        onCancel={cancelDeleteProduct}
      />
    </div>
  );
}

export default App;
