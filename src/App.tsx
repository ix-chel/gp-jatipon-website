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

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow w-full">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/tentang-gp" component={About} />
          <Route path="/kegiatan" component={Activities} />
          <Route path="/kegiatan/:slug" component={ActivityDetail} />
          
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
  );
}

export default App;
