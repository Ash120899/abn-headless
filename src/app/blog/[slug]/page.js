export const runtime = 'edge';

export default function BlogPost({ params }) {
  return (
    <div style={{ padding: "100px", color: "white", background: "black" }}>
      <h1>Blog Slug:</h1>
      <p>{params.slug}</p>
    </div>
  );
}