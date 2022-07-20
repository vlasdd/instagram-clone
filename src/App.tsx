import React, { lazy, Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux-setup/hooks";
import { AnimatePresence } from "framer-motion";
import fetchSignedUser from "redux-setup/features/signed-user/thunks/fetchSignedUser";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-setup/firebaseConfig";
import { setIsBeingLoaded } from "redux-setup/features/is-being-loaded/isBeingLoaded";
import AppRouter from "components/routes/AppRouter";

const Loading = lazy(() => import("pages/loading/Loading"));

const App: React.FC = () => {
  const isBeingLoaded = useAppSelector(state => state.isBeingLoaded.isBeingLoaded);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (data) => {
      dispatch(setIsBeingLoaded(true));

      if (data) {
        console.log("auth")
        dispatch(fetchSignedUser(data.uid))
      }

      dispatch(setIsBeingLoaded(false));
    })
  }, [])

  return (
    isBeingLoaded ?
      <Loading /> :
      <AnimatePresence>
        <Suspense fallback={<Loading/>}>
          <AppRouter />
        </Suspense>
      </AnimatePresence>
  )
}

export default App;
