import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Dummy_Data = [
  {
    id: 'p1', 
    price : 6, 
    title: 'my first book', 
    description: 'This is a first product - amazing!'
  },
  {
    id: 'p2', 
    price : 5, 
    title: 'my second book', 
    description: 'This is a second product - amazing!'
  },

];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {Dummy_Data.map((product) => 
            <ProductItem
            key={product.id}
            id = {product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        )}
        
      </ul>
    </section>
  );
};

export default Products;
