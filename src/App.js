import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRouters } from '~/routers';
import { DefaultLayout } from './layouts';
import { Fragment } from 'react';

import './App.css';

function App() {
    return (
        <Router>
            <div className="ARouterp">
                <Routes>
                    {publicRouters.map((router, index) => {
                        const Page = router.component;

                        let Layout = DefaultLayout;

                        if (router.layout) {
                            Layout = router.layout;
                        }
                        if (router.layout === null) {
                            Layout = Fragment;
                            console.log(1);
                        }
                        return (
                            <Route
                                key={index}
                                path={router.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
