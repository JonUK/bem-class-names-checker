declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// Register SVGs as content modules
declare module '*.svg' {
  const content: any; 
  export default content; 
}
