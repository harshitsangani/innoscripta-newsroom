import { ArticleFilters } from "./components/ArticleFilters";
import { ArticlesView } from "./components/ArticlesView";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <ArticleFilters />
        <ArticlesView />
      </div>
    </>
  );
}

export default App;
