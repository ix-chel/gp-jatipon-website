import { Switch, Route } from "wouter";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Activities } from "./pages/Activities";
import { ActivityDetail } from "./pages/ActivityDetail";
import { ContentHub } from "./pages/ContentHub";
import { ContentDetail } from "./pages/ContentDetail";
import { Community } from "./pages/Community";
import { About } from "./pages/About";
import { Archive } from "./pages/Archive";
import { ArchiveDetail } from "./pages/ArchiveDetail";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

// Admin Imports
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminLayout } from "./layouts/AdminLayout";
import { Login } from "./pages/admin/Login";
import { Dashboard } from "./pages/admin/Dashboard";
import { AdminBoost } from "./pages/admin/AdminBoost";
import { BoostEditor } from "./pages/admin/BoostEditor";
import { AdminContent } from "./pages/admin/AdminContent";
import { AdminActivities } from "./pages/admin/AdminActivities";
import { AdminArchives } from "./pages/admin/AdminArchives";
import { AdminNotFound } from "./pages/admin/AdminNotFound";
import { BoostDetail } from "./pages/BoostDetail";
import { Redirect } from "wouter";

function App() {
  return (
    <AuthProvider>
      <Switch>
        {/* Admin Login - No Layout */}
        <Route path="/admin/login" component={Login} />

        {/* Protected Admin Routes */}
        <Route path="/admin" nest>
          <ProtectedRoute>
            <AdminLayout>
              <Switch>
                {/* Redirect any accidental /admin/admin/* prefix to clean /admin/dashboard */}
                <Route path="/admin/:rest*">
                  {() => <Redirect to="/dashboard" />}
                </Route>

                <Route path="/" component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/boost" component={AdminBoost} />
                <Route path="/boost/new" component={BoostEditor} />
                <Route path="/boost/:id/edit" component={BoostEditor} />
                <Route path="/content" component={AdminContent} />
                <Route path="/activities" component={AdminActivities} />
                <Route path="/archives" component={AdminArchives} />
                <Route component={AdminNotFound} />
              </Switch>
            </AdminLayout>
          </ProtectedRoute>
        </Route>

        {/* Public Website Routes */}
        <Route>
          <div className="min-h-screen flex flex-col bg-background text-ink-700">
            <Navbar />
            
            <main className="flex-grow w-full">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/tentang-gp" component={About} />
                <Route path="/kegiatan" component={Activities} />
                <Route path="/kegiatan/:slug" component={ActivityDetail} />
                
                <Route path="/boost/:slug" component={BoostDetail} />
                <Route path="/boost">{() => <Redirect to="/arsip?format=boost" />}</Route>
                
                <Route path="/konten" component={ContentHub} />
                <Route path="/konten/kategori/:category" component={ContentHub} />
                <Route path="/konten/baca/:slug" component={ContentDetail} />
                
                <Route path="/komunitas" component={Community} />
                <Route path="/komunitas/:action" component={Community} />
                
                <Route path="/arsip" component={Archive} />
                <Route path="/arsip/:slug" component={ArchiveDetail} />
                
                <Route path="/contact" component={Contact} />
                
                <Route component={NotFound} />
              </Switch>
            </main>
            
            <Footer />
          </div>
        </Route>
      </Switch>
    </AuthProvider>
  );
}

export default App;
