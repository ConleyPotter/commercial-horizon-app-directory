export async function getServerSideProps() {
  const res = await fetch(`https://...`);
  const products = await res.json();

  return { props: { products } };
}

export default function Products({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
