export { default } from "app/pages/home";

export async function getServerSideProps() {
  return {
    props: {
      meta: {
        deeplinkUrl: `/home`,
      },
    },
  };
}
