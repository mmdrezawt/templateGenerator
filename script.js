let a = `
const LinesMapperConfig: MapperConfig<getBaseinfoSfrlinesIdResponse, Lines> = {
  value: 'id',
  label: 'name',
};

const ToOptionMapperConfig: MapperConfig<Lines, Option> = {
  value: 'value',
  label: 'label',
};

export const useGetLines = (enabled: boolean) => {
  return useDataQuery({
    enabled,
    fetchFn: async (): Promise<Lines[]> => {
      const response = await getSfrLines();

      console.log("this is a goooooooo",response.data.result.map((item: getBaseinfoSfrlinesIdResponse) =>
        dynamicMapper(item, LinesMapperConfig)
      ))
      return response.data.result.map((item: getBaseinfoSfrlinesIdResponse) =>
        dynamicMapper(item, LinesMapperConfig)
      )
    },
    transformData: (item: any) => ({
      value: item.value ?? item.id ?? 0,
      label: item.label ?? item.name ?? '',
    }),
    localDataTransform: (item: any) :Option => {
      return dynamicMapper(item as Lines, ToOptionMapperConfig);
    },
    queryKey: ['getLines'],
    repository: LinesRepository, // Pass LinesRepository as a parameter
  })
}
`;

let toBeReplaced;
let replacement;
let template;
let result;

const wordToBeReplaced = document.querySelector('#inWord');
const replacementWord = document.querySelector('#oWord');
const templateInput = document.querySelector('.template-input');
const generateBtn = document.querySelector('.btn');
const copyBtn = document.querySelector('.copy');
const codeSection = document.querySelector('.code-section');

const onGenerateClick = (e) => {
  e.preventDefault();
  if (wordToBeReplaced.value && replacementWord.value && templateInput.value) {
    toBeReplaced = wordToBeReplaced.value;
    replacement = replacementWord.value;
    template = templateInput.value;
    wordToBeReplaced.value = "";
    replacementWord.value = "";
    templateInput.value = "";
    result = template.replace(new RegExp(toBeReplaced, "g"), replacement).replace(new RegExp(toBeReplaced.toLowerCase(), "g"), replacement.toLowerCase());
    codeSection.textContent = result;
  } else {
    alert('fill inputs correctly');
  }
  if(!result) alert('fill inputs correctly');
}

generateBtn.addEventListener("click", onGenerateClick);
copyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (result) {
    navigator.clipboard.writeText(result);
    copyBtn.textContent = "copied";
    copyBtn.style.backgroundColor = "#3e495e";
    setTimeout(() => {
      copyBtn.textContent = "copy";
      copyBtn.style.backgroundColor = "#6e81a5";
    }, 1500);
  }
});